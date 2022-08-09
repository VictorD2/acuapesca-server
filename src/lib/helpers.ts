/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import fs from 'fs-extra';
import path from 'path';
import { ObjectSchema } from 'joi';
import boom from '@hapi/boom';
import chalk from 'chalk';

const { log } = console;

// Encrypting password function
export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

// Compare password function
export const matchPassword = async (password: string, savedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (error: any) {
    log(error);
    return false;
  }
};

// Delete file function
export const deleteFile = async (pathname: string, filename: string) => {
  try {
    await fs.unlink(path.join(__dirname, pathname, filename));
  } catch (error) {
    log(error);
  }
};

// Validate Schemas
export const validatorHandler = (schema: ObjectSchema, property: 'params' | 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error.message));
    }
    next();
  };
};

export const logErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  log(chalk.red('log error'));
  log(chalk.red(err.message));
  return next(err);
};

export const boomErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.isBoom) {
    log(chalk.red('Boom errorHandler'));
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }
  return next(err);
};

export const errorHandler = (err: any, req: Request, res: Response) => {
  log(chalk.red('errorHandler'));
  return res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

export const write = (message: string, color: 'green' | 'red' | 'yellow') => {
  if (color === 'green') log(chalk.green(message));
  if (color === 'red') log(chalk.red(message));
  if (color === 'yellow') log(chalk.yellow(message));
};
