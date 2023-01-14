import { UserRepository } from '../repositories';

export const register = async ({ userId, password, email }) => {
  const user = await UserRepository.register({ userId, password, email });

  return user;
};

export const isExistUser = async ( userId  , email  ) => {
  let isExistUser = true;

  const userUuid = await UserRepository.isExistUser( userId, email );
  if( userUuid == null ) isExistUser = false;
  
  return isExistUser;
};

export const updatePassword = async ( userId, email, tempPassword ) => {
  const user = await UserRepository.updatePassword( userId, email, tempPassword );

  return user;
};
