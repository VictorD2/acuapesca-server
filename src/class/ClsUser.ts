import { IUser } from '@interfaces/IUser';
import User, { UserInput } from '@models/user.model';
import config from '@config/config';
import Rol from '@models/rol.model';
import { encryptPassword } from '@lib/helpers';

const adminUser: UserInput = {
  id: parseInt(`${config.adminId}`, 10),
  name: `${config.adminName}`,
  lastname: `${config.adminLastname}`,
  email: `${config.adminEmail}`,
  password: `${config.adminPassword}`,
  rol_id: parseInt(`${config.adminRolId}`, 10),
  status: 1,
  address: '',
  dni: '',
  photo: '',
};

class ClsUser {
  static async creatingAdminUser() {
    await User.create(adminUser);
  }

  static async createUser(user: IUser): Promise<IUser | undefined> {
    // Encrypting password
    const newUser = user;
    newUser.password = await encryptPassword(`${user.password}`);
    const { email, name, lastname, password, address, dni } = newUser;

    const createdUser = await User.create(
      {
        email,
        name,
        lastname,
        password,
        address,
        dni,
      },
      {
        include: [{ model: Rol, attributes: ['id', 'name'] }],
        attributes: { exclude: ['createdAt', 'password', 'updatedAt'] },
      }
    );
    const userFound = await User.findByPk(createdUser.id, {
      include: [{ model: Rol, attributes: ['id', 'name'] }],
      attributes: { exclude: ['createdAt', 'password', 'updatedAt'] },
    });

    // exist?
    if (user === null) return undefined;

    return JSON.parse(JSON.stringify(userFound));
  }

  static async getUsers(): Promise<IUser[]> {
    const users = await User.findAll({
      include: [{ model: Rol, attributes: ['id', 'name'] }],
      attributes: { exclude: ['createdAt', 'password', 'updatedAt'] },
    });
    return users;
  }

  static async getUserById(id: number): Promise<IUser | undefined> {
    const user = await User.findByPk(id, {
      include: [{ model: Rol, attributes: ['id', 'name'] }],
      attributes: { exclude: ['createdAt', 'password', 'updatedAt'] },
    });

    // exist?
    if (user === null) return undefined;

    return JSON.parse(JSON.stringify(user));
  }

  static async getUserByEmail(emailParam: string): Promise<IUser | undefined> {
    const user = await User.findOne({
      where: { email: emailParam },
      include: [{ model: Rol, attributes: ['id', 'name'] }],
      attributes: { exclude: ['createdAt', 'password', 'updatedAt'] },
    });

    // exist?
    if (user === null) return undefined;

    return JSON.parse(JSON.stringify(user));
  }

  static async updateUser(user: IUser): Promise<IUser | undefined> {
    const { id } = user;

    // Query
    const [result] = await User.update(user, { where: { id } });
    if (result === 0) return undefined;

    const newUser = await User.findByPk(id, {
      include: [{ model: Rol, attributes: ['id', 'name'] }],
      attributes: { exclude: ['createdAt', 'password', 'updatedAt'] },
    });

    return JSON.parse(JSON.stringify(newUser));
  }

  static async editUserPhoto(id: number, photo: string): Promise<string> {
    await User.update({ photo }, { where: { id } });
    return photo;
  }

  static async changeStatus(status: boolean, id: number): Promise<boolean> {
    const [result] = await User.update(
      { status },
      {
        where: {
          id,
        },
      }
    );
    return result === 1;
  }
}

export default ClsUser;
