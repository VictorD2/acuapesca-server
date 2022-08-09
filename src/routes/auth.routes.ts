import { Router } from 'express';
import { registerUser, loginUser, changeStateUser, changePasswordUser } from '@controllers/auth.controller';
import {
  changePasswordUserSchema,
  changeUserSchema,
  getUserSchema,
  loginUserSchema,
  registerUserSchema,
} from '@schemas/User.schema';
import { validatorHandler } from '@lib/helpers';
import { checkRoles, JWTAuth } from '@lib/auth.handler';

const router = Router();

router.post('/signin', validatorHandler(loginUserSchema, 'body'), loginUser);

router.post('/signup', validatorHandler(registerUserSchema, 'body'), registerUser);

router.patch(
  '/state/:id',
  JWTAuth,
  checkRoles('Administrador'),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(changeUserSchema, 'body'),
  changeStateUser
);

router.patch('/password', JWTAuth, validatorHandler(changePasswordUserSchema, 'body'), changePasswordUser);

export default router;
