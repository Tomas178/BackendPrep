import { GracefulShutdownPriority } from '@/constants/gracefulShutdownPriority';
import logger from '@/lib/logger';

export type CleanupHandlerFunction = () => Promise<void> | void;
export type ExitFunction = (code: number) => void;

interface CleanupHandler {
  name: string;
  handler: CleanupHandlerFunction;
  priority: GracefulShutdownPriority;
}

export class GracefulShutdownManager {
  private isShuttingDown = false;
  private cleanupHandlers: CleanupHandler[] = [];
  private shutdownTimeout: number;
  private handlerTimeout: number;
  private exit: ExitFunction;

  constructor(
    shutdownTimeout = 30_000,
    handlerTimeout = 5_000,
    exit: ExitFunction = (code) => process.exit(code)
  ) {
    this.shutdownTimeout = shutdownTimeout;
    this.handlerTimeout = handlerTimeout;
    this.exit = exit;
  }

  registerCleanup(
    name: string,
    handler: CleanupHandlerFunction,
    priority: GracefulShutdownPriority
  ) {
    this.cleanupHandlers.push({ name, handler, priority });
  }

  async shutdown(signal: string) {
    if (this.isShuttingDown) {
      logger.shutdown('Shutdown already in progress');
      return;
    }

    this.isShuttingDown = true;
    logger.shutdown(`${signal} received. Starting graceful shutdown...`);
    const startTime = Date.now();

    const forceShutdownTimer = setTimeout(() => {
      console.error('Shutdown timeout exceeded, forcing exit');
      setTimeout(() => this.exit(1), 100);
    }, this.shutdownTimeout).unref();

    try {
      const sortedHandlers = this.cleanupHandlers.toSorted(
        (a, b) => b.priority - a.priority
      );

      for (const { name, handler } of sortedHandlers) {
        try {
          await Promise.race([
            handler(),
            new Promise<never>((_, reject) =>
              setTimeout(
                () => reject(new Error(`${name} cleanup timed out`)),
                this.handlerTimeout
              )
            ),
          ]);
          logger.shutdown(`${name} closed`);
        } catch (error) {
          logger.error(`Error cleaning up ${name}: ${error}`);
        }
      }

      const duration = Date.now() - startTime;
      logger.shutdown(`Graceful shutdown completed in ${duration}ms`);

      clearTimeout(forceShutdownTimer);
      setTimeout(() => this.exit(0), 100);
    } catch (error) {
      logger.error(`Error during shutdown: ${error}`);
      clearTimeout(forceShutdownTimer);
      setTimeout(() => this.exit(1), 100);
    }
  }

  isTerminating() {
    return this.isShuttingDown;
  }
}

const globalForShutdown = globalThis as unknown as {
  gracefulShutdownManager?: GracefulShutdownManager;
};

export const gracefulShutdownManager =
  globalForShutdown.gracefulShutdownManager ?? new GracefulShutdownManager();

if (!globalForShutdown.gracefulShutdownManager) {
  globalForShutdown.gracefulShutdownManager = gracefulShutdownManager;
}
