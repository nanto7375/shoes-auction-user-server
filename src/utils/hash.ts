import bcrypt from 'bcryptjs';
import envConfig from '../config/env.config';

const { passwordSalt } = envConfig;

export const generateHashPassword = ( password: string ) => bcrypt.hashSync( password, bcrypt.genSaltSync( +passwordSalt ) );

export const checkPassword = ( inPassword: string, dbPassword: string ) => bcrypt.compareSync( inPassword, dbPassword );

