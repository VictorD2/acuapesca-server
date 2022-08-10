/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import config from '@config/config';
import ClsUser from '@src/class/ClsUser';
import { IUser } from '@interfaces/IUser';
import { signToken } from '@lib/jwt';
import { deleteFile } from '@lib/helpers';

// Get users controller
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await ClsUser.getUsers();
    return res.json({ success: 'Datos obtenidos', users }).status(200);
  } catch (error: any) {
    return next(boom.internal(error.message));
  }
};

// Register user controller
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser: IUser | undefined = await ClsUser.createUser(req.body);
    if (newUser === undefined) return next(boom.badRequest('Algo sucedió mal durante la creación del usuario'));
    return res.json({ success: 'Usuario creado', user: newUser }).status(200);
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

// Get user by id controller
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

// Update user controller
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.id = req.params.id;
    const updatedUser = await ClsUser.updateUser(req.body);
    if (updatedUser === undefined) return next(boom.notFound('No existe un usuario con esa id'));
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

// Edit User's Photo Controller
export const editUserPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { file } = req.body;

    const id = req.user?.id;
    const idUser = parseInt(`${id}`, 10);
    const user = await ClsUser.getUserById(idUser);

    if (!user) return next(boom.notFound('No existe un usuario con esa id'));

    const { photo } = user;
    if (`${photo}` !== 'defaultPhotoProfile.png') await deleteFile('../public/user_photos', `${photo}`);

    // // Update User
    const photoUser = await ClsUser.editUserPhoto(parseInt(`${id}`, 10), file);
    user.photo = `${photoUser}`;
    const token = signToken(user, `${config.jwtSecret}`);
    return res.json({ success: 'Foto modificada correctamente', photo: photoUser, token });
  } catch (error: any) {
    console.log(error);
    if (error.code === 'ER_DUP_ENTRY') return res.json({ error: 'El correo ya está registrado' });
    return next(boom.internal(error.message));
  }
};

// Update user's state controller
export const changeStateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await ClsUser.changeStatus(status, parseInt(`${id}`, 10));

    if (result) return res.json({ success: `Usuario ${status ? 'Habilitado' : 'Inhabilitado'}` }).status(200);

    return next(boom.notFound('No existe un usuario con esa id'));
  } catch (error: any) {
    return next(boom.internal(error.message));
  }
};
