/// <reference types="express" />

/**
 * This type definition example file
 * (if external dependecy doesn't have types, we need to ceate this file and add it manually)
 * External dependecy: express-flash
 * from @types/express-flash
 */
declare namespace Express {
  export interface Request {
    flash(event: string, message: any): any;
  }
}

interface Flash {
  flash(type: string, message: any): void;
}

declare module 'express-flash';
