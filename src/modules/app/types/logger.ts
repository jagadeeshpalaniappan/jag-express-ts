interface LoggerFn {
  (logMessage?: any, ...any: any): void;
}

export interface LoggerTraceInfo {
  xb3Id: string;
  [key: string]: string;
}

export interface Logger {
  debug?: LoggerFn;
  warn?: LoggerFn;
  info?: LoggerFn;
  error?: LoggerFn;
  start?: LoggerFn;
  end?: LoggerFn;
  failed?: LoggerFn;
}
