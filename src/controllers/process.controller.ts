/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import ClsProcess from '@class/ClsProcess';

// Get Process Controller
export const getProcess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const processes = await ClsProcess.getProcess(`${req.user?.rol.name}`);

    return res.json({ success: 'Datos obtenidos', processes });
  } catch (error: any) {
    console.log(error);
    return next(boom.internal(error.message));
  }
};

// Get Process By Id Controller
export const getProcessById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const process = await ClsProcess.getProccessById(parseInt(`${id}`, 10), `${req.user?.rol.name}`);
    if (process === undefined) return next(boom.notFound('No existe un proceso con esa id'));
    return res.json({ success: 'Proceso encontrado', process });
  } catch (error: any) {
    console.log(error);
    return next(boom.internal(error.message));
  }
};

// Create Process Controller
export const createProcess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProcess = await ClsProcess.createProcess(req.body);
    return res.json({ success: 'Proceso creado', process: newProcess });
  } catch (error: any) {
    console.log(error);
    return next(boom.internal(error.message));
  }
};

// Edit Process Controller
export const editProcess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    req.body.id = id;
    const process = await ClsProcess.editProcess(req.body);
    if (process === undefined) return next(boom.notFound('No existe un proceso con esa id'));
    return res.json({ success: 'Proceso editado', process });
  } catch (error: any) {
    console.log(error);
    return next(boom.internal(error.message));
  }
};

// Change Status Process Controller
export const changeStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    req.body.id = id;
    const result = await ClsProcess.changeStatus(req.body);
    if (!result) return next(boom.notFound('No existe un proceso con esa id'));
    return res.json({ success: `Proceso ${req.body.status ? 'Habilitado' : 'Inhabilitado'}` });
  } catch (error: any) {
    console.log(error);
    return next(boom.internal(error.message));
  }
};
