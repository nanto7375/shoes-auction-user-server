import { Request, Response, NextFunction } from 'express';
import ErrorException from '../exceptions/form.exception';
import { badData } from '../exceptions/definition.exception';

import { removeBlank, isEmail } from '../utils/stringUtil';

const removeAllBlank = ( obj: Record<string, string> ): Record<string, string> => {
  const copiedObj = { ...obj };

  Object.keys( copiedObj ).forEach( key => {
    copiedObj[key] = removeBlank( copiedObj[key]);
  });

  return copiedObj;
};

export const validateJoinBody = ( req: Request, res: Response, next: NextFunction ) => {
  const { userId, password, email } = req.body;

  // type 및 값 유무 체크
  [ userId, password, email ].forEach( elem => {
    if ( typeof elem !== 'string' || !elem.trim() ) {
      throw new ErrorException( badData );
    }
  });

  // email 형식 체크
  if ( !isEmail( email ) ) {
    throw new ErrorException( badData );
  }

  // 띄어쓰기 제거
  req.body = removeAllBlank({ userId, password, email });

  next();
};
