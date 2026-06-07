// Fábrica de middleware de validação com Joi.
// Uso: validate(schema) retorna um middleware que valida req.body
// contra o schema fornecido antes de chegar ao controller.
//
// abortEarly: false → coleta TODOS os erros de uma vez (não para no primeiro)

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const mensagens = error.details.map(d => d.message).join('; ');
      return res.status(400).json({ erro: mensagens });
    }

    next();
  };
}

module.exports = validate;
