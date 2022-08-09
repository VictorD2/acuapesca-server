/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import path from 'path';

const indexController = async (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, '../build/public', 'index.html'));
};
export default indexController;
