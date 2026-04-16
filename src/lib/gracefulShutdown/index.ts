import { gracefulShutdownManager } from './GracefulShutdownManager';
import logger from '../logger';

let installed = false;

export function setupGracefulShutdown() {
  if (installed) return;
  installed = true;

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
    gracefulShutdownManager.shutdown('unhandledRejection');
  });
}
