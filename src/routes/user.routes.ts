import { Router } from 'express';
import { checkRoles, JWTAuth } from '@lib/auth.handler';
import { getUsers, getUserById, updateUser } from '@controllers/user.controller';
import { getUserSchema, updateUserSchema } from '@schemas/User.schema';
import { validatorHandler } from '@lib/helpers';

const router = Router();

router.get('/', JWTAuth, checkRoles('Administrador'), getUsers);

router.get('/:id', JWTAuth, checkRoles('Administrador'), validatorHandler(getUserSchema, 'params'), getUserById);

router.put('/', JWTAuth, validatorHandler(updateUserSchema, 'body'), updateUser);

export default router;
