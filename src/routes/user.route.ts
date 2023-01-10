import { Router, Request, Response } from 'express';
// import { Joi, Segments, celebrate } from 'celebrate';

import ErrorException from '../exceptions/form.exception';
import { badData } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';

import { UserService } from '../services';
import { UserMiddleware } from '../middlewares';

const router = Router();

/**회원가입
 * req.body - userId: string, hashedPassword: string, email: string */
router.post( '/users', UserMiddleware.joinValidation, UserMiddleware.hashPassword, responseWrapper( async ( req: Request, res: Response ) => {
  const { userId, hashedPassword, email } = req.body;

  const user = await UserService.register({ userId, hashedPassword, email });
  
  resSuccess( res, { result: user });
}) );

/**test */
router.get( '/users/:userUuid', responseWrapper( async ( req: Request, res: Response ) => {
  const { userUuid } = req.params;
  
  if ( !userUuid ) {
    throw new ErrorException( badData );
  }

  console.log( userUuid );
  resSuccess( res, { result: userUuid });
}) );

export default router;
