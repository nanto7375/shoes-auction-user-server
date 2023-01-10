import ErrorException from '../exceptions/form.exception';
import { badData } from '../exceptions/definition.exception';

import { removeEmptySpace, isEmail } from '../utils/stringUtil';
import { generateHashPassword } from '../utils/hash';

export const joinValidation = ( req, res, next ) => {
  const { userId, password, email } = req.body;

  if ( !userId.trim() || !password.trim() || !email.trim() ) {
    throw new ErrorException( badData );
  }
  if ([ userId, password, email ].some( elem => typeof elem !== 'string' ) || !isEmail( email ) ) {
    throw new ErrorException( badData );
  }

  Object.keys( req.body ).forEach( key => {
    if ( key !== 'userId' && key !== 'password' && key !== 'email' ) {
      return;
    }
    req.body[key] = removeEmptySpace( req.body[key]);
  });

  next();
};

export const hashPassword = ( req, res, next ) => {
  const { password } = req.body;

  req.body.hashedPassword = generateHashPassword( password );
  delete req.body.password;

  next();
};
