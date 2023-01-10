import bcrypt from 'bcryptjs';
import envConfig from '../config/env.config';

const { passwordSalt } = envConfig;

export const generateHashPassword = ( password: string ) => {
  const salt = bcrypt.genSaltSync( +passwordSalt );
  const hashPassword = bcrypt.hashSync( password, salt );
  return hashPassword;
};

export const checkPassword = ( inPassword: string, dbPassword: string ) => bcrypt.compareSync( inPassword, dbPassword );

