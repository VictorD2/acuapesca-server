import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import passport from 'passport';

// Middleware for roles
export const checkRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (!user) return next(boom.unauthorized('JWT Missing'));
    if (roles.includes(user.rol.name)) return next();
    return next(boom.unauthorized('No tienes permisos para realizar esta acción'));
  };
};

// Authenticate by JWT
export const JWTAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user, info: TokenExpiredError) => {
    if (err || !user) return next(boom.unauthorized(info.message));
    req.user = user;
    return next();
  })(req, res, next);
};
