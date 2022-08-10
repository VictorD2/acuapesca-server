import { DataTypes, Optional, Model, BuildOptions } from 'sequelize';
import { sequelize } from '@src/database';
import Rol from './rol.model';
import { IUser, IUserModel } from '@interfaces/IUser';

type ModeloUser = typeof Model & {
  // eslint-disable-next-line no-unused-vars
  new (values?: object, options?: BuildOptions): IUserModel;
};

const User = <ModeloUser>sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'defaultPhotoProfile.png',
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 1,
  },
  rol_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2,
  },
});

Rol.hasOne(User, {
  foreignKey: 'rol_id',
  sourceKey: 'id',
});
User.belongsTo(Rol, { foreignKey: 'rol_id', targetKey: 'id' });

export type UserInput = Optional<IUser, 'id'>;

export type UserOutput = Required<IUser>;

export default User;
