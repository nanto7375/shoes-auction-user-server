import { UserRepository } from '../repositories';

export const register = async ({ userId, hashedPassword, email }) => {
  const user = await UserRepository.register({ userId, hashedPassword, email });

  return user;
};
