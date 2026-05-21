const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email':    'Email inválido',
    'any.required':    'Email é obrigatório',
  }),
  senha: Joi.string().min(6).required().messages({
    'string.min':   'Senha deve ter ao menos 6 caracteres',
    'any.required': 'Senha é obrigatória',
  }),
});

const registroSchema = Joi.object({
  nome:      Joi.string().max(100).required().messages({ 'any.required': 'Nome é obrigatório' }),
  email:     Joi.string().email().required().messages({ 'string.email': 'Email inválido', 'any.required': 'Email é obrigatório' }),
  senha:     Joi.string().min(6).required().messages({ 'string.min': 'Senha deve ter ao menos 6 caracteres', 'any.required': 'Senha é obrigatória' }),
  idade:     Joi.number().integer().min(0).required().messages({ 'any.required': 'Idade é obrigatória' }),
  altura:    Joi.number().positive().required().messages({ 'any.required': 'Altura é obrigatória' }),
  profissao: Joi.string().max(100).allow('', null),
  cidade:    Joi.string().max(100).allow('', null),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required().messages({ 'any.required': 'refreshToken é obrigatório' }),
});

module.exports = { loginSchema, registroSchema, refreshSchema };
