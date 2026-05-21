// Middleware de erro global — captura qualquer erro repassado via next(err).
// Centraliza o tratamento de erros: os controllers não precisam mais de
// res.status(500).json(...) inline — apenas chamam next(err).
//
// O Express reconhece este middleware pelos 4 parâmetros (err, req, res, next).
// Deve ser registrado DEPOIS de todas as rotas no app.js.

function errorHandler(err, req, res, next) {

  // Erros de unicidade do banco (ex: email ou placa duplicada)
  if (err.name === 'SequelizeUniqueConstraintError') {
    const campo = err.errors?.[0]?.path  ?? 'campo';
    const valor = err.errors?.[0]?.value ?? '';
    return res.status(409).json({ erro: `Já existe um registro com '${valor}' em '${campo}'` });
  }

  // Erros de validação do Sequelize (allowNull violado, etc.)
  if (err.name === 'SequelizeValidationError') {
    const mensagens = err.errors.map(e => e.message).join('; ');
    return res.status(400).json({ erro: mensagens });
  }

  // Erros gerados pela aplicação com statusCode explícito (ex: 404, 400)
  const status = err.statusCode || 500;
  res.status(status).json({ erro: err.message || 'Erro interno do servidor' });
}

module.exports = errorHandler;
