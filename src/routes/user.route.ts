import { Router, Request, Response } from 'express';
// import { Joi, Segments, celebrate } from 'celebrate';

import ErrorException from '../exceptions/form.exception';
import { badData, badRequest } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';
import { checkPassword } from '../utils/hash';
import { UserService } from '../services';
import { UserMiddleware } from '../middlewares';

const router = Router();

/**회원가입
 * req.body type { userId: string; hashedPassword: string; email: string; }*/
router.post( '/users', UserMiddleware.joinValidation, UserMiddleware.hashPassword, responseWrapper( async ( req: Request, res: Response ) => {
  const { userId, password, email } = req.body;

  const user = await UserService.register({ userId, password, email });
  
  resSuccess( res, { result: user });
}) );

/**
 * 로그인 
 */
router.post( '/users/login', responseWrapper( async ( req: Request, res: Response ) => {
  const { userId, password } = req.body;

  if ( !userId || !password ) {
    throw new ErrorException( badData );
  }
  // password 매칭
  const findUser = await UserService.findPasswordAndRoleByUserId({ userId });
  const isValidUser = await checkPassword( password, findUser.password );
  console.log( "isValidUser : ", isValidUser );

  if ( !isValidUser ) {
    throw new ErrorException( badData );
  }
  
  const role = findUser.role;
  console.log( "role : ", role );
  const { accessToken, refreshToken } = await UserService.getJwtTokens({ userId, role });
  console.log( "accessToken, refreshToken", accessToken, refreshToken );

  resSuccess( res, { userId, role ,accessToken, refreshToken }); // userId, role ,accessToken, refreshToken
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

/**
 * 비밀번호 찾기 - 임시비밀번호 발급 
 * req.query ?userId=uuid&email=email
*/
router.get( '/find-password' ,responseWrapper( async ( req: Request, res: Response ) => {
  const{ userId, email }  = req.query;

  if ( !userId || !email ) {
    throw new ErrorException( badData );
  }

  const isExistUser = await UserService.isExistUser( userId as string, email as string );
  if ( !isExistUser ) {
    throw new ErrorException( badRequest );
  }

  const tempPassword = Array( 10 ).fill( null ).map( () => Math.round( Math.random() * 10 ) ).join( '' ); 
  await UserService.updatePassword({ userId, email, tempPassword });
  
  resSuccess( res, { tempPassword });
}) );

export default router;
