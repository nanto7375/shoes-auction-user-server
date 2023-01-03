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
  public storeId!: number;
  public status!: 'CLOSED' | 'OPEN' | 'PAUSE';
  public pushToken!: string;
  public deliveryArea!: Array<number>;
  public unpauseDate!: Date;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
  public store?: Record<string, any>;
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
      comment: '매점 uuid',
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    storeId: {
      type: DataTypes.INTEGER, 
      unique: true, 
    },
    status: {
      comment: '매점 운영 정보',
      type: DataTypes.ENUM( 'OPEN', 'CLOSED', 'PAUSE' ),
      defaultValue: 'CLOSED',
    },
    pushToken: {
      comment: '푸시 토근',
      type: DataTypes.STRING( 255 ),
    },
    deliveryArea: {
      comment: '배달 가능 지역',
      type: DataTypes.JSON,
      validate: {
        schema: schemaValidator({
          type: 'array',
          properties: 'number',
        }),
      },
      defaultValue: [],
      get() {
        const originDeliveryArea = this.getDataValue( 'deliveryArea' );
        if( typeof originDeliveryArea === 'string' ){
          return JSON.parse( originDeliveryArea );
        }
        return originDeliveryArea;
      },
    },
    unpauseDate: {
      comment: '매점 재개 시간',
      type: DataTypes.DATE, 
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
