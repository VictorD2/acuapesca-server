import { Model } from 'sequelize';
import { IRol, IRolModel } from './IRol';

export interface IUserModel extends Model {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  status: boolean | number;
  rol_id: number;
  rol: IRolModel;
}

export interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  status: boolean | number;
  rol_id: number;
  rol?: IRol;
}
