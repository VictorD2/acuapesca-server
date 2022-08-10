import { Router, Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import { checkRoles, JWTAuth } from '@lib/auth.handler';
import {
  getUsers,
  getUserById,
  updateUser,
  registerUser,
  editUserPhoto,
  changeStateUser,
} from '@controllers/user.controller';
import { changeUserSchema, getUserSchema, registerUserSchema, updateUserSchema } from '@schemas/User.schema';
import { validatorHandler } from '@lib/helpers';
import { fotosPerfil } from '@lib/multer';

const router = Router();

// Photo middleware
const multerFile = (req: Request, res: Response, next: NextFunction) => {
  fotosPerfil.single('photo')(req, res, err => {
    if (err) return next(boom.badRequest(err)); // A Multer error occurred when uploading.
    if (req.file === undefined) return next(boom.badRequest("Falta el campo 'photo'"));
    req.body.file = req.file.filename;
    return next();
  });
};

// Get Users Route
router.get('/', JWTAuth, getUsers);

// Get User By Id Route
router.get('/:id', JWTAuth, validatorHandler(getUserSchema, 'params'), getUserById);

// Create User Route
router.post('/', validatorHandler(registerUserSchema, 'body'), registerUser);

// Edit User Route
router.put(
  '/:id',
  JWTAuth,
  validatorHandler(updateUserSchema, 'body'),
  validatorHandler(getUserSchema, 'params'),
  updateUser
);

// Edit User's Photo Route
router.patch('/photo', JWTAuth, multerFile, editUserPhoto);

// Edit User's Status Route
router.patch(
  '/state/:id',
  JWTAuth,
  checkRoles('Administrador'),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(changeUserSchema, 'body'),
  changeStateUser
);

export default router;
