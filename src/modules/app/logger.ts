import { Request } from 'express';
import { AppError, getErr } from '../common/error';
import winstonLoggerInst from './config/winston';
import { Logger } from './types/logger';
import { Meta } from './types/meta';

export const START = 'START';
export const END = 'END';
export const FAILED = 'FAILED';
export const DEFAULT_XB3ID = 'APP';

const getMessage = (msg: any) => {
  if (msg instanceof AppError) {
    return getErr(msg.appErr, true);
  } else if (msg instanceof Error) {
    return JSON.stringify(msg, Object.getOwnPropertyNames(msg));
  } else if (typeof msg === 'object') {
    return msg;
  } else {
    return msg;
  }
};

const log = (level: string, logKey: any, meta: Meta = { xb3Id: DEFAULT_XB3ID }, statusKey?: string) => {
  return (message: any, msgData?: any, ...extra: any) => {
    const _logKey = getMessage(logKey);
    const _message = getMessage(message);
    const _msgData = getMessage(msgData);
    const logObj: any = { level };
    if (meta.xb3Id) logObj.xb3Id = meta.xb3Id;
    if (_logKey) logObj.logKey = _logKey;
    if (statusKey) logObj.statusKey = statusKey;
    if (_message) {
      logObj.message = _message;
      if (_msgData) {
        logObj.message = { key: _message, data: _msgData };
        if (extra && extra.length > 0) {
          logObj.message.extra = extra;
        }
      }
    }

    winstonLoggerInst.log(logObj);
  };
};

export const getLogger = (logKey: string, meta?: Meta): Logger => {
  const logger: Logger = {};
  logger.debug = log('debug', logKey, meta);
  logger.warn = log('warn', logKey, meta);
  logger.info = log('info', logKey, meta);
  logger.error = log('error', logKey, meta);
  logger.start = log('info', logKey, meta, START);
  logger.end = log('info', logKey, meta, END);
  logger.failed = log('info', logKey, meta, FAILED);
  return logger;
};

export const getMeta = (req: Request): Meta => {
  const xb3Id = <string>req.headers['xb3id'];
  return { xb3Id };
};
