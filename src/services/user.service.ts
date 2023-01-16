import { UserRepository } from '../repositories';

export const register = async ({ userId, password, email }) => {
  const user = await UserRepository.register({ userId, password, email });

  return user;
};

export const isExistUser = async ( userId: string  , email: string  ): Promise<boolean> => {

  const userUuid = await UserRepository.isExistUser( userId, email );
  
  return !!userUuid;
};

export const updatePassword = async ({ userId, email, tempPassword }) => {
  const user = await UserRepository.updatePassword({ tempPassword }, { where: { userId, email } });

  return user;
};
