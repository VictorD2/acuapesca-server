import { DataTypes, Optional, Model, BuildOptions } from 'sequelize';
import { sequelize } from '@src/database';
import { ISettings, ISettingsModel } from '@interfaces/ISettings';

type ModeloSettings = typeof Model & {
  // eslint-disable-next-line no-unused-vars
  new (values?: object, options?: BuildOptions): ISettingsModel;
};

const Settings = <ModeloSettings>sequelize.define('Settings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export type SettingsInput = Optional<ISettings, 'id'>;

export type SettingsOutput = Required<ISettings>;

export default Settings;
