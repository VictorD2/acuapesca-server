import Joi from 'joi';

const name = Joi.string().required().messages({
  'any.required': `El campo nombre es requerido`,
});

const code = Joi.string().alphanum().required().messages({
  'any.required': `El campo código es requerido`,
});

const status = Joi.boolean().required().messages({
  'any.required': `El campo estado es requerido`,
});

const id = Joi.number().required().positive().messages({
  'any.required': `El campo id es requerido`,
  'any.positive': `El campo id es un número`,
});

export const createProcessSchema = Joi.object({
  name,
  code,
});

export const updateProcessSchema = Joi.object({
  name,
  code,
});

export const getProcessSchema = Joi.object({
  id,
});

export const changeStatusProcessSchema = Joi.object({
  status,
});
