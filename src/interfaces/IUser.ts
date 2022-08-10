import { Model } from 'sequelize';
import { IRol } from './IRol';

export interface IUserModel extends Model {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  status: boolean | number;
  address: string;
  dni: string;
  photo: string;
  rol_id: number;
  rol: IRol;
}

export interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  status: boolean | number;
  address: string;
  dni: string;
  photo: string;
  rol_id: number;
  rol?: IRol;
}
