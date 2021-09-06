export interface IAppErrorObj {
  status?: string;
  code?: string;
  msg?: string;
  err?: Error | string;
}

export const getErr = (appErr: IAppErrorObj, stackTrace?: boolean): IAppErrorObj => {
  if (!stackTrace) return appErr;
  const { err, ...rest } = appErr;
  return { ...rest, err: JSON.stringify(err, Object.getOwnPropertyNames(err)) };
};

export class AppError extends Error {
  constructor(public appErr: IAppErrorObj) {
    super(appErr.msg);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AppError.prototype);
  }

  print(): string {
    return 'AppError: ' + this.message;
  }
  toJSON(): IAppErrorObj {
    return getErr(this.appErr);
  }
}
