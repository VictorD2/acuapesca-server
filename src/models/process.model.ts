import { DataTypes, Optional, Model, BuildOptions } from 'sequelize';
import { sequelize } from '@src/database';
import { IProcess, IProcessModel } from '@interfaces/IProcess';

type ModeloProcess = typeof Model & {
  // eslint-disable-next-line no-unused-vars
  new (values?: object, options?: BuildOptions): IProcessModel;
};

const Process = <ModeloProcess>sequelize.define('Process', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

export type ProcessInput = Optional<IProcess, 'id'>;

export type ProcessOutput = Required<IProcess>;

export default Process;
