import { UserRepository } from '../repositories';
import AuthServer from '../server/authServer';

export const register = async ({ userId, password, email }) => {
  const user = await UserRepository.register({ userId, password, email });

  return user;
};

export const isExistUser = async ( userId: string  , email: string  ): Promise<boolean> => {

  const userUuid = await UserRepository.isExistUser( userId, email );
  
  return !!userUuid;
};

export const findPasswordAndRoleByUserId = async ( userId ) => {
  // ! userRepository에 findPasswordAndRoleByUserId는 생각해 보면 findOne의 특수한 형태임.
  // ! userId 값으로 조회하는 건 지금뿐만 아니라 다른 경우에도 사용할 수 있을 것 같음!
  // ! userRepository 내에 findPasswordAndRoleByUserId를 findOneByUserId로 바꾼 후 attribute 값은 따로 설정하지 않고
  // ! 여기서 리턴 받는 user -> {password, role}로 변경해서 사용하면 이후에 findOneByUserId는 다른 곳에서도 재사용할 수 있음!
  const { password, role } = await UserRepository.findOneByUserId( userId );
  return { password, role };
};

export const updatePassword = async ({ userId, email, tempPassword }) => {
  const result = await UserRepository.updatePassword({ tempPassword }, { where: { userId, email } });

  return result;
};

// auth-server에서 토큰받아오기
export const getJwtTokens = async({ userId, role }) => {
  const tokens = await AuthServer.getTokens({ userId, role });
  return tokens;
};
