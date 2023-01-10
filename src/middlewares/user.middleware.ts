import { Request, Response, NextFunction } from 'express';
import ErrorException from '../exceptions/form.exception';
import { badData } from '../exceptions/definition.exception';

import { removeEmptySpace, isEmail } from '../utils/stringUtil';
import { generateHashPassword } from '../utils/hash';

const removeAllEmptySpace = ( obj: Record<string, string> ): Record<string, string> => {
  const copiedObj = { ...obj };

  Object.keys( copiedObj ).forEach( key => {
    copiedObj[key] = removeEmptySpace( copiedObj[key]);
  });

  return copiedObj;
};

export const joinValidation = ({ body }: Request, res: Response, next: NextFunction ) => {
  const { userId, password, email } = body;

  [ userId, password, email ].forEach( elem => {
    if ( typeof elem !== 'string' || !elem.trim() ) {
      throw new ErrorException( badData );
    }
  });

  if ( !isEmail( email ) ) {
    throw new ErrorException( badData );
  }

  body = removeAllEmptySpace({ userId, password, email });

  next();
};

export const hashPassword = ({ body }: Request, res: Response, next: NextFunction ) => {
  const { password } = body;

  body.hashedPassword = generateHashPassword( password );
  delete body.password;

  next();
};
