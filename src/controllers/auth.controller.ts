/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import boom from '@hapi/boom';
import { signToken } from '@lib/jwt';
import ClsAuth from '@class/ClsAuth';
import ClsUser from '@class/ClsUser';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate('local.signin', { session: false }, (err, user) => {
      if (err) return next(err);

      // Singing token with the user
      const token = signToken(user, `${process.env.JWT_SECRET}`);

      return res.json({ success: 'Sesión Iniciada', user, token });
    })(req, res, next);
  } catch (error: any) {
    next(boom.internal(error.message));
  }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate('local.signup', { session: false }, (err, user) => {
      if (err) return next(err);

      // Singing token with the user
      const token = signToken(user, `${process.env.JWT_SECRET}`);

      return res.json({ success: 'Sesión Iniciada', user, token });
    })(req, res, next);
  } catch (error: any) {
    next(boom.internal(error.message));
  }
};

export const changeStateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = await ClsUser.getUserById(parseInt(`${id}`, 10));

    if (!user) return next(boom.badData('No existe un usuario con esa id'));

    req.body.id = user.id;
    await ClsAuth.changeStatus(status, parseInt(`${id}`, 10));

    return res.json({ success: `Usuario ${status ? 'Habilitado' : 'Inhabilitado'}` }).status(200);
  } catch (error: any) {
    return next(boom.internal(error.message));
  }
};

export const changePasswordUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.id = req.user?.id;
    const { password } = req.body;
    await ClsAuth.changePassword(password, parseInt(`${req.body.id}`, 10));
    return res.json({ success: `Contraseña cambiada` }).status(200);
  } catch (error: any) {
    return next(boom.internal(error.message));
  }
};
