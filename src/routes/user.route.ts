import { Router, Request, Response } from 'express';
// import { Joi, Segments, celebrate } from 'celebrate';

import ErrorException from '../exceptions/form.exception';
import { badData, badRequest, alreadyRegisterd } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';
import { checkPassword } from '../utils/hash';
import { UserService } from '../services';
import { UserMiddleware } from '../middlewares';


const router = Router();
const { validateJoinBody, hashPassword } = UserMiddleware;

/**회원가입
 * req.body type { userId: string; hashedPassword: string; email: string; }*/
router.post( '/users', validateJoinBody, hashPassword, responseWrapper( async ( req: Request, res: Response ) => {
  const { userId, password, email } = req.body;
  
  const userInDb = await UserService.getUserByUserId( userId );
  if ( userInDb ) {
    throw new ErrorException( alreadyRegisterd );
  }

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
  // ! 함수명만으로 함수 매개변수가 파악이 되는 경우에는 굳이 구조분해할당 형식으로 인수 넣지 않아도 됨!
  // ! findPasswordAndRoleByUserId 같은 경우, userId 값을 매개변수로 받겠구나가 짐작되니까 말이지^ㅡ^
  // ! 그리고 findUser의 경우와 같이 객체 그 자체가 아니라 객체의 속성만 사용할 경우에는, 구조분해할당으로 함수 값을 리턴 받으면 사용하기 편함.
  // ! findUser -> {role, password} 이런 식으로!
  // ! 지금은 password가 req.body에서도 구조분해할당으로 받았으니까
  // ! {role, password: dbPassword} 이런 식으로 해서 사용하면 됨.
  const user  = await UserService.getUserByUserId( userId );
  if ( !user ) {
    throw new ErrorException( badRequest );
  }

  const { role, password: dbPassword, uuid: userUuid } = user;
  const isValidUser = await checkPassword( password, dbPassword );
  console.log( "isValidUser : ", isValidUser );

  if ( !isValidUser ) {
    throw new ErrorException( badData );
  }
  
  const { accessToken, refreshToken } = await UserService.getJwtTokens({ userUuid, role });
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
