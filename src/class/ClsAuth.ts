import User from '@models/user.model';
import IValidation from '@interfaces/IValidation';
import { matchPassword } from '@lib/helpers';

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
}
export default ClsAuth;
