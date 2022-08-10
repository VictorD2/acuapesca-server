import { Router } from 'express';
import { loginUser } from '@controllers/auth.controller';
import { loginUserSchema } from '@schemas/User.schema';
import { validatorHandler } from '@lib/helpers';

const router = Router();

router.post('/signin', validatorHandler(loginUserSchema, 'body'), loginUser);

export default router;
