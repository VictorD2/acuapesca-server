/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import boom from '@hapi/boom';
import { signToken } from '@lib/jwt';

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

export default { loginUser };
