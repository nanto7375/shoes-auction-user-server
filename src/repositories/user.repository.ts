import db from '../models/index.model';
import ErrorException from '../exceptions/form.exception';

const { User } = db;

export const aaa = () => {
  console.log( 'repository' );
};

export const register = async ({ userId, hashedPassword, email }) => {
  const user = await User.create({ userId, hashedPassword, email });

  return user;
};


export const findUserByUuid = async ( uuid ) => {
  const user = await User.findOne({ where: { uuid }, attributes: [ 'email' ] });

  return user;
};
