import { DataTypes, Optional, Model, BuildOptions } from 'sequelize';
import { sequelize } from '@src/database';
import { IRol, IRolModel } from '@interfaces/IRol';

type ModeloRol = typeof Model & {
  // eslint-disable-next-line no-unused-vars
  new (values?: object, options?: BuildOptions): IRolModel;
};

const Rol = <ModeloRol>sequelize.define('rol', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export type RolInput = Optional<IRol, 'id'>;

export type RolOutput = Required<IRol>;

export default Rol;
