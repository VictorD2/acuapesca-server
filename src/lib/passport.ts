/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from 'passport';
import boom from '@hapi/boom';
import { Strategy } from 'passport-local';
import { ExtractJwt, Strategy as StrategyJWT } from 'passport-jwt';
import { IUser } from '@interfaces/IUser';
import ClsUser from '@class/ClsUser';
import config from '@config/config';
import ClsAuth from '@class/ClsAuth';

// LOGIN
passport.use(
  'local.signin',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const verification = await ClsAuth.verifyLogin(email, password);

        if (!verification.validation) return done(boom.badRequest(verification.message), false);

        const user: IUser | undefined = await ClsUser.getUserByEmail(email);

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(boom.internal('Ocurrió un error inesperado'), false);
      }
    }
  )
);

// Passport con JWT
passport.use(
  'jwt',
  new StrategyJWT(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
    },
    async (payload, done) => {
      try {
        return done(null, payload);
      } catch (error) {
        console.log(error);
        return done(error, payload);
      }
    }
  )
);
