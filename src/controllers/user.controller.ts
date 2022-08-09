/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import ClsUser from '@src/class/ClsUser';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await ClsUser.getUsers();
    return res.json({ success: 'Datos obtenidos', users }).status(200);
  } catch (error: any) {
    return next(boom.internal(error.message));
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await ClsUser.getUserById(parseInt(`${id}`, 10));
    if (!user) return next(boom.badData('No existe un usario con esa id'));
    return res.json({ success: 'Datos obtenidos', user }).status(200);
  } catch (error: any) {
    return next(boom.internal(error.message));
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.id = req.user?.id;
    req.body.rol = req.user?.rol;
    const updatedUser = await ClsUser.updateUser(req.body);

    return res.json({ success: 'Datos modificados correctamente', user: updatedUser }).status(200);
  } catch (error: any) {
    let message = '';
    if (error.original) {
      if (error.original.code === 'ER_DUP_ENTRY') {
        message = `El correo ${req.body.email} ya está registrado`;
      }
    }
    return next(boom.badRequest(message === '' ? error.message : message));
  }
};
