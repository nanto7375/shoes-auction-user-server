import { Request, Response, NextFunction } from 'express';
import ErrorException from '../exceptions/form.exception';
import { badData } from '../exceptions/definition.exception';

import { removeBlank, isEmail } from '../utils/stringUtil';
import { generateHashPassword } from '../utils/hash';

const removeAllBlank = ( obj: Record<string, string> ): Record<string, string> => {
  const copiedObj = { ...obj };

  Object.keys( copiedObj ).forEach( key => {
    copiedObj[key] = removeBlank( copiedObj[key]);
  });

  return copiedObj;
};

export const joinValidation = ( req: Request, res: Response, next: NextFunction ) => {
  const { userId, password, email } = req.body;

  [ userId, password, email ].forEach( elem => {
    if ( typeof elem !== 'string' || !elem.trim() ) {
      throw new ErrorException( badData );
    }
  });

  if ( !isEmail( email ) ) {
    throw new ErrorException( badData );
  }

  req.body = removeAllBlank({ userId, password, email });

  next();
};

export const hashPassword = ( req: Request, res: Response, next: NextFunction ) => {
  const { password } = req.body;

  req.body.hashedPassword = generateHashPassword( password );
  delete req.body.password;

  next();
};
