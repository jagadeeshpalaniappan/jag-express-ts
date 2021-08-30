import winstonLoggerInst from './external/winston';
import { Logger } from './types/logger';

export const getLogger = (fileName: string): Logger => {
  const logger = {
    debug: function (logMessage: string, ...any: any) {
      winstonLoggerInst.debug(fileName + '::' + logMessage, ...any);
    },
    warn: function (logMessage: string, ...any: any) {
      winstonLoggerInst.warn(fileName + '::' + logMessage, ...any);
    },
    info: function (logMessage: string, ...any: any) {
      winstonLoggerInst.info(fileName + '::' + logMessage, ...any);
    },
    error: function (logMessage: string, ...any: any) {
      winstonLoggerInst.error(fileName + '::' + logMessage, ...any);
    },
  };

  return logger;
};
