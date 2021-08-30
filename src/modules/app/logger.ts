import winstonLoggerInst from './external/winston';
import { Logger } from './types/logger';

export const START = 'START';
export const END = 'END';
export const FAILED = 'FAILED';

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
    start: function (logMessage: string, ...any: any) {
      winstonLoggerInst.debug(`${fileName}::${START}::${logMessage}`, ...any);
    },
    end: function (logMessage: string, ...any: any) {
      winstonLoggerInst.debug(`${fileName}::${END}::${logMessage}`, ...any);
    },
    failed: function (logMessage: string, ...any: any) {
      winstonLoggerInst.error(`${fileName}::${FAILED}::${logMessage}`, ...any);
    },
  };

  return logger;
};
