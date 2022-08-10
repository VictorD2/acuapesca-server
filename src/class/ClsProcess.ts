import { IProcess } from '@interfaces/IProcess';
import Process from '@models/process.model';

/*
  Description: This class is for manage Process's data
*/
class ClsProcess {
  /*
    Description: This method validate request body
  */

  /*
    Description: This method get all process
  */
  static async getProcess(rol: string): Promise<IProcess[]> {
    if (rol === 'Administrador') {
      const processes = await Process.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      return processes;
    }
    const processes = await Process.findAll({
      where: { status: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return processes;
  }

  /*
    Description: This method create a new process
    @param id: process's id
    @param rango: user's rango
  */
  static async getProccessById(id: number, rol: string): Promise<IProcess | undefined> {
    if (rol === 'Administrador') {
      const process = await Process.findOne({
        where: { id },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      if (process === null) return undefined;
      return JSON.parse(JSON.stringify(process));
    }

    const process = await Process.findOne({
      where: { status: true, id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (process === null) return undefined;
    return JSON.parse(JSON.stringify(process));
  }

  /*
      Description: This method create a new process
      @param process: IProcess
    */
  static async createProcess(process: IProcess): Promise<IProcess> {
    const { name, code } = process;
    const newProcess = await Process.create({ name, code });
    return newProcess;
  }

  /*
      Description: This method edit a process
      @param process: IProcess
    */
  static async editProcess(process: IProcess): Promise<IProcess | undefined> {
    const { id } = process;
    const [result] = await Process.update(process, { where: { id } });
    if (result === 0) return undefined;
    return process;
  }

  /*
      Description: This method create a new process
      @param process: IProcess
      @status id: process's status
    */
  static async changeStatus(process: IProcess): Promise<boolean> {
    const { status, id } = process;
    const [result] = await Process.update({ status }, { where: { id } });
    return result === 1;
  }
}

export default ClsProcess;
