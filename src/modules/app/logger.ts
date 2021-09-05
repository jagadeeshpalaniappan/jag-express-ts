import winstonLoggerInst from './external/winston';
import { Logger } from './types/logger';

export const START = 'START';
export const END = 'END';
export const FAILED = 'FAILED';

export const getLogger = (): Logger => {
  const logger: Logger = { traceInfo: { xb3Id: 'DEFAULT' } };

  logger.debug = function (logKey: string, logMessage: string, ...any: any) {
    // winstonLoggerInst.debug(fileName + '::' + logMessage, ...any);
    winstonLoggerInst.log({
      level: 'debug',
      message: `${logKey}::${logMessage}`,
      ...logger.traceInfo,
      ...any,
    });
  };

  logger.warn = function (logKey: string, logMessage: string, ...any: any) {
    // winstonLoggerInst.warn(fileName + '::' + logMessage, ...any);
    winstonLoggerInst.log({
      level: 'warn',
      message: `${logKey}::${logMessage}`,
      ...logger.traceInfo,
      ...any,
    });
  };
  logger.info = function (logKey: string, logMessage: string, ...any: any) {
    // winstonLoggerInst.info(fileName + '::' + logMessage, ...any);
    winstonLoggerInst.log({
      level: 'info',
      message: `${logKey}::${logMessage}`,
      ...logger.traceInfo,
      ...any,
    });
  };
  logger.error = function (logKey: string, logMessage: string, ...any: any) {
    // winstonLoggerInst.error(fileName + '::' + logMessage, ...any);
    winstonLoggerInst.log({
      level: 'error',
      message: `${logKey}::${logMessage}`,
      ...logger.traceInfo,
      ...any,
    });
  };
  logger.start = function (logKey: string, logMessage: string = '', ...any: any) {
    // winstonLoggerInst.debug(`${fileName}::${START}::${logMessage}`, ...any);
    winstonLoggerInst.log({
      level: 'info',
      message: `${logKey}::${START}::${logMessage}`,
      ...logger.traceInfo,
      ...any,
    });
  };
  logger.end = function (logKey: string, logMessage: string = '', ...any: any) {
    // winstonLoggerInst.debug(`${fileName}::${END}::${logMessage}`, ...any);
    winstonLoggerInst.log({
      level: 'info',
      message: `${logKey}::${END}::${logMessage}`,
      ...logger.traceInfo,
      ...any,
    });
  };
  logger.failed = function (logKey: string, logMessage: string = '', ...any: any) {
    // winstonLoggerInst.error(`${fileName}::${FAILED}::${logMessage}`, ...any);
    winstonLoggerInst.log({
      level: 'error',
      message: `${logKey}::${FAILED}::${logMessage}`,
      ...logger.traceInfo,
      ...any,
    });
  };
  logger.setTraceInfo = function (key: string, value: string) {
    logger.traceInfo[key] = value;
  };

  return logger;
};
