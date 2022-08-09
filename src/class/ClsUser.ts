import { IUser } from '@interfaces/IUser';
import User, { UserInput } from '@models/user.model';
import config from '@config/config';
import Rol from '@models/rol.model';

const adminUser: UserInput = {
  id: parseInt(`${config.adminId}`, 10),
  name: `${config.adminName}`,
  lastname: `${config.adminLastname}`,
  email: `${config.adminEmail}`,
  password: `${config.adminPassword}`,
  rol_id: parseInt(`${config.adminRolId}`, 10),
  status: 1,
};

class ClsUser {
  static async creatingAdminUser() {
    await User.create(adminUser);
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

  static async updateUser(user: IUser): Promise<IUser> {
    const { id } = user;
    // Query
    await User.update(user, { where: { id } });
    const newUser = await User.findByPk(id, {
      include: [{ model: Rol, attributes: ['id', 'name'] }],
      attributes: { exclude: ['createdAt', 'password', 'updatedAt'] },
    });
    return JSON.parse(JSON.stringify(newUser));
  }
}

export default ClsUser;
