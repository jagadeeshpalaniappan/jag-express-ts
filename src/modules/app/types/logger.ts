interface LoggerFn {
  (logMessage?: string, ...any: any): void;
}

export interface Logger {
  debug: LoggerFn;
  warn: LoggerFn;
  info: LoggerFn;
  error: LoggerFn;
  start: LoggerFn;
  end: LoggerFn;
  failed: LoggerFn;
}
