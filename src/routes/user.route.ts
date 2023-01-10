import { Router, Request, Response } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';

import ErrorException from '../exceptions/form.exception';
import { badRequest, badData, unAuthorized } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';
import { UserService } from '../services/index.service';

import { generateHashPassword } from '../utils/hash';

const router = Router();

const joinValidation = ( req, res, next ) => {
  const { userId, password, email } = req.body;

  if ( !userId || !password || !email ) {
    throw new ErrorException( badData );
  }

  next();
};

const hashPassword = ( req, res, next ) => {
  const { password } = req.body;

  req.body.hashedPassword = generateHashPassword( password );

  next();
};

router.post( '/users', joinValidation, hashPassword, responseWrapper( async ( req: Request, res: Response ) => {
  const { userId, hashedPassword, email } = req.body;
  console.log( hashedPassword );

  const user = await UserService.register({ userId, hashedPassword, email });
  
  resSuccess( res, { result: user });
}) );

router.get( '/users/:userUuid', responseWrapper( async ( req: Request, res: Response ) => {
  const { userUuid } = req.params;
  
  if ( !userUuid ) {
    throw new ErrorException( badData );
  }

  console.log( userUuid );
  resSuccess( res, { result: userUuid });
}) );

export default router;
