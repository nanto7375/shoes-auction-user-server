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

// // store <-> staff
// db.Store.hasOne( db.Staff, { onDelete: 'CASCADE' });
// db.Staff.belongsTo( db.Store, { onDelete: 'CASCADE' });

// // store <-> businessRegistration
// db.Store.hasOne( db.BusinessRegistration, { onDelete: 'CASCADE' });
// db.BusinessRegistration.belongsTo( db.Store, { onDelete: 'CASCADE' });

// // store <-> storeAgreement
// db.Store.hasOne( db.StoreAgreement, { onDelete: 'CASCADE' });
// db.StoreAgreement.belongsTo( db.Store, { onDelete: 'CASCADE' });

// // 매점 관련 join
// // store <-> cafeteria
// db.Store.hasOne( db.Cafeteria, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// db.Cafeteria.belongsTo( db.Store );

// // cafeteria <-> order
// db.Cafeteria.hasMany( db.Order, { foreignKey: 'cafeteriaUuid', sourceKey: 'uuid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// db.Order.belongsTo( db.Cafeteria, { targetKey: 'uuid', foreignKey: 'cafeteriaUuid' });

// // cafeteria <-> menu
// db.Cafeteria.hasMany( db.Menu, { foreignKey: 'cafeteriaUuid', sourceKey: 'uuid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// db.Menu.belongsTo( db.Cafeteria, { targetKey: 'uuid', foreignKey: 'cafeteriaUuid' });

// // cafeteria <-> menuCategory
// db.Cafeteria.hasMany( db.MenuCategory, { foreignKey: 'cafeteriaUuid', sourceKey: 'uuid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// db.MenuCategory.belongsTo( db.Cafeteria, { targetKey: 'uuid', foreignKey: 'cafeteriaUuid' });

// // menuCategory <-> menu
// db.MenuCategory.hasMany( db.Menu, { foreignKey: 'categoryUuid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// db.Menu.belongsTo( db.MenuCategory, { as:'category' });

// // menu <-> menuOption
// db.Menu.hasMany( db.MenuOption, { as: 'options', foreignKey: 'menuUuid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// db.MenuOption.belongsTo( db.Menu );

// // order <-> orderDetail
// db.Order.hasMany( db.OrderDetail, { as: 'specification', foreignKey: 'orderUuid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// db.OrderDetail.belongsTo( db.Order );

// // menu <-> orderDetail
// db.Menu.hasMany( db.OrderDetail, { as: 'specification', foreignKey: 'menuUuid', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
// db.OrderDetail.belongsTo( db.Menu );

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
    logger.error({ dbMsg: `[DB]Unable to connect to the database error=${error}` });
  }
};

export default db;
