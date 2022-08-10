import { Model } from 'sequelize';

export interface IProcess {
  id: number;
  name: string;
  code: string;
  status: boolean | number;
}

export interface IProcessModel extends Model {
  id: number;
  name: string;
  code: string;
  status: boolean | number;
}
