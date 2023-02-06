import db from '../models';
// import ErrorException from '../exceptions/form.exception';

const { User } = db;

export const register = async ( body: Record<string, unknown> ) => {
  const user = await User.create( body );

  return user;
};

export const findUserByUuid = async ( uuid: string ) => {
  const user = await User.findOne({ where: { uuid }, attributes: [ 'email' ] });

  return user;
};

export const findOneByUserId = async ( userId: string ) => {
  const user = await User.findOne({ where: { userId } });
  return user;
};

export const isExistUser = async ( userId :string, email :string ) => {
  const userUuid = await User.findOne({ attributes: [ 'uuid' ], where: { userId, email } });
  
  return userUuid;
};

export const updatePassword = async ( body: Record<string, unknown>, { where }) => {
  const result = await User.update( body, { where });
  
  return result[0];
};
