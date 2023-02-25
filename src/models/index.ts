import { Sequelize, Op } from 'sequelize';

import logger from '../config/log.config';
import sequelizeConfig from '../config/sequelize.config';
import envConfig from '../config/env.config';

import UserFactory from './user.model';

const { env } = envConfig;

interface SequelizeConfig {
    database: string;
    username: string;
    password: string;
    options: Record<string, unknown>;
}

const { database, username, password, options }: SequelizeConfig = sequelizeConfig;

export const sequelize = new Sequelize( database, username, password, options );

const db = {
  sequelize,
  Sequelize,
  User: UserFactory( sequelize ),
  Op,
};

// sequelize
export const checkDbConnection = async () => {
  try {
    logger.info({ env : `[ENV] ${env}` });
    
    await db.sequelize.authenticate();
    if ( env === 'DEV' ) {
      // await db.sequelize.sync({ force: true, alter: true });
    }

    logger.info({ dbMsg: '[DB]Connection has been established successfully.' });
  } catch ( error ) {
    console.log( error );
    logger.error({ dbMsg: `[DB]Unable to connect to the database error=${error}` });
  }
};

export default db;
