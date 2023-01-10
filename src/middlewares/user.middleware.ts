import ErrorException from '../exceptions/form.exception';
import { badData } from '../exceptions/definition.exception';
import { generateHashPassword } from '../utils/hash';

const removeEmptySpace = ( str = '' ) => str.replace( / /g,"" );

const isEmail = ( email ) => {
  const regexEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return email.match( regexEmail ); 
};

export const joinValidation = ( req, res, next ) => {
  Object.keys( req.body ).forEach( key => {
    if ( key !== 'userId' && key !== 'password' && key !== 'email' ) {
      return;
    }
    req.body[key] = removeEmptySpace( req.body[key]);
  });

  const { userId, password, email } = req.body;

  if ( !userId || !password || !email || !isEmail( email ) ) {
    throw new ErrorException( badData );
  }

  next();
};

export const hashPassword = ( req, res, next ) => {
  const { password } = req.body;

  req.body.hashedPassword = generateHashPassword( password );
  delete req.body.password;

  next();
};
