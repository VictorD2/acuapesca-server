import { Model } from 'sequelize';

export interface ISettings {
  id: number;
  key: string;
  value: string;
}

export interface ISettingsModel extends Model {
  id: number;
  key: string;
  value: string;
}
