const Joi = require('joi');

const anoAtual = new Date().getFullYear();

const carroCriarSchema = Joi.object({
  marca:    Joi.string().max(100).required().messages({ 'any.required': 'Marca é obrigatória' }),
  modelo:   Joi.string().max(100).required().messages({ 'any.required': 'Modelo é obrigatório' }),
  pessoaId: Joi.number().integer().positive().required().messages({ 'any.required': 'pessoaId é obrigatório' }),
  ano:      Joi.number().integer().min(1900).max(anoAtual + 1).allow(null),
  cor:      Joi.string().max(50).allow('', null),
  placa:    Joi.string().max(10).allow('', null),
});

const carroAtualizarSchema = Joi.object({
  marca:    Joi.string().max(100).required().messages({ 'any.required': 'Marca é obrigatória' }),
  modelo:   Joi.string().max(100).required().messages({ 'any.required': 'Modelo é obrigatório' }),
  pessoaId: Joi.number().integer().positive().allow(null),
  ano:      Joi.number().integer().min(1900).max(anoAtual + 1).allow(null),
  cor:      Joi.string().max(50).allow('', null),
  placa:    Joi.string().max(10).allow('', null),
});

module.exports = { carroCriarSchema, carroAtualizarSchema };
