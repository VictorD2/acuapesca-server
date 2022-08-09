import User from '@models/user.model';
import IValidation from '@interfaces/IValidation';
import { encryptPassword, matchPassword } from '@lib/helpers';
import { IUser } from '@interfaces/IUser';
import Rol from '@models/rol.model';

class ClsAuth {
  static async verifyLogin(emailParam: string, password: string): Promise<IValidation> {
    const user = await User.findOne({ where: { email: emailParam } });

    // exist?
    if (user === null) return { message: 'El correo no está registrado', validation: false };

    // Enaled or disabled?
    if (!user.status) return { message: 'Estás deshabilitado', validation: false };

    // Password match?
    if (!(await matchPassword(password, user.password))) return { message: 'Contraseña incorrecta', validation: false };
    return { message: 'Verificado', validation: true };
  }

  static async createUser(user: IUser): Promise<IUser> {
    // Encrypting password
    const newUser = user;
    newUser.password = await encryptPassword(`${user.password}`);
    const { email, name, lastname, password } = newUser;

    const createdUser = await User.create(
      {
        email,
        name,
        lastname,
        password,
        rol_id: 2,
      },
      {
        include: [{ model: Rol, attributes: ['id', 'name'] }],
        attributes: { exclude: ['createdAt', 'password', 'updatedAt'] },
      }
    );

    const userFound: IUser = {
      id: createdUser.id,
      email,
      name,
      lastname,
      password,
      rol_id: 2,
      status: true,
      rol: {
        id: 2,
        name: 'Usuario',
      },
    };

    return userFound;
  }

  static async changeStatus(status: boolean, id: number): Promise<void> {
    await User.update(
      { status },
      {
        where: {
          id,
        },
      }
    );
  }

  static async changePassword(password: string, id: number): Promise<void> {
    const newPassword = await encryptPassword(password);
    await User.update(
      { password: newPassword },
      {
        where: {
          id,
        },
      }
    );
  }
}
export default ClsAuth;
