import { Router, Request, Response } from 'express';
// import { Joi, Segments, celebrate } from 'celebrate';

import ErrorException from '../exceptions/form.exception';
import { badData } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';

import { UserService } from '../services';
import { UserMiddleware } from '../middlewares';

const router = Router();

/**회원가입
 * req.body type { userId: string; hashedPassword: string; email: string; }*/
router.post( '/users', UserMiddleware.joinValidation, UserMiddleware.hashPassword, responseWrapper( async ( req: Request, res: Response ) => {
  const { userId, email, password } = req.body;
  const user = await UserService.register({ userId, password, email });
  
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

/**test */
router.get( '/users/test', responseWrapper( async ( req: Request, res: Response ) => {
  console.log( "tttttt" );
  const test  = req.params;
  

  console.log( test );
  resSuccess( res, { result: test });
}) );

/**
 * 비밀번호 찾기 - 회원검증
 * req.query ?userId=uuid&email=email
*/
router.get( '/find-password' ,responseWrapper( async ( req: Request, res: Response ) => {
  const{ userId, email }  = req.query;

  if ( !userId || !email ) {
    throw new ErrorException( badData );
  }

  const isExistUser = await UserService.isExistUser( userId , email );

  resSuccess( res, { result: isExistUser });
}) );

export default router;
