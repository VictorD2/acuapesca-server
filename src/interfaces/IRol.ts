import { Model } from 'sequelize';

export interface IRol {
  id: number;
  name: string;
}
export interface IRolModel extends Model {
  id: number;
  name: string;
}
