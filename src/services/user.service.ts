import { UserRepository } from '../repositories/index.repository';

export const aaa = () => {
  console.log( 'service' );
};

export const register = async ({ userId, hashedPassword, email }) => {
  const user = await UserRepository.register({ userId, hashedPassword, email });

  return user;
};
