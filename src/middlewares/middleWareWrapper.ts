import { Request, Response, NextFunction } from 'express';

const mwWrapper = ( func ) => async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    await func();
    next();
  } catch ( error ) {
    next( error );
  }
};

export default mwWrapper;
