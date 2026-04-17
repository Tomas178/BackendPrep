import { gracefulShutdownManager } from './GracefulShutdownManager';
import logger from '../logger';

const globalForShutdown = globalThis as unknown as {
  shutdownInstalled?: boolean;
};

export function setupGracefulShutdown() {
  if (globalForShutdown.shutdownInstalled) return;
  globalForShutdown.shutdownInstalled = true;

  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  for (const signal of signals) {
    process.once(signal, () => {
      gracefulShutdownManager.shutdown(signal);
    });
  }

  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught exception: ${err.stack ?? err}`);
    gracefulShutdownManager.shutdown('uncaughtException');
  });

  process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled rejection: ${reason}`);
  });
}
