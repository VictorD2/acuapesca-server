import { Router } from 'express';
import { JWTAuth } from '@lib/auth.handler';
import { createProcess, getProcess, getProcessById, editProcess, changeStatus } from '@controllers/process.controller';
import { changeStatusProcessSchema, createProcessSchema, getProcessSchema } from '@schemas/process.schema';
import { validatorHandler } from '@lib/helpers';

const router = Router();

router.get('/', JWTAuth, getProcess);

router.get('/:id', JWTAuth, validatorHandler(getProcessSchema, 'params'), getProcessById);

router.post('/', JWTAuth, validatorHandler(createProcessSchema, 'body'), createProcess);

router.put(
  '/:id',
  JWTAuth,
  validatorHandler(getProcessSchema, 'params'),
  validatorHandler(createProcessSchema, 'body'),
  editProcess
);

router.patch(
  '/:id',
  JWTAuth,
  validatorHandler(getProcessSchema, 'params'),
  validatorHandler(changeStatusProcessSchema, 'body'),
  changeStatus
);

export default router;
