import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import revalidator from 'revalidator';

const schemaValidator = function ( schema ) {
  return function ( value ) {
    const results = revalidator.validate( value, schema );
    if ( !results.valid ) throw new Error( JSON.stringify( results.errors ) );
  };
};

class User extends Model {
  public id!: number;
  public uuid!: string;
  public userId!: string;
  public password!: string;
  public email!: string;
  public isLogin!: boolean;
  public isBanned!: boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

type UserStatic = typeof Model & {
  new ( values?: Record<string, unknown>, options?: BuildOptions ): User;
};

const UserFactory = ( sequelize : Sequelize ): UserStatic => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    uuid: {
      comment: '유저 uuid',
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING, 
      unique: true, 
      comment: '유저 id',
      notNull: true,
    },
    password: {
      comment: '비밀번호',
      type: DataTypes.STRING,
      notNull: true,
    },
    email: {
      comment: '유저 mail',
      type: DataTypes.STRING,
      notNull: true,
    },
    isLogin: {
      comment: '로그인 유무',
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBanned: {
      comment: '차단 여부',
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  };
  
  const User = <UserStatic>sequelize.define( 'users', attributes, { 
    paranoid: true, 
    underscored: true, 
    comment: '회원 정보',
  });

  return User;
};

export default UserFactory;
