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

export const isExistUser = async ( userId :string, email :string ) => {
  console.log( "userId", "email" , "isError?" );
  const userUuid = await User.findOne({ attributes: [ 'uuid' ], where: { userId, email } });
  console.log( "에러아님" );
  
  return userUuid;
};
