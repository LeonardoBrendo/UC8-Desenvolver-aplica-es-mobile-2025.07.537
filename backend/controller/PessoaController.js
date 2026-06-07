// Validação de entrada é feita pelo middleware Joi antes de chegar aqui.
// Erros de negócio são repassados via next(err) ao middleware errorHandler.

const PessoaService = require('../service/PessoaService');

class PessoaController {

  constructor() {
    this.service = new PessoaService();
  }

  // GET /pessoas?page=1&limit=10
  async listarTodos(req, res, next) {
    try {
      const page  = parseInt(req.query.page)  || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await this.service.listarTodos(page, limit);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /pessoas/:id
  async buscarPorId(req, res, next) {
    try {
      const pessoa = await this.service.buscarPorId(req.params.id);
      res.status(200).json(pessoa);
    } catch (err) {
      next(err);
    }
  }

  // POST /pessoas
  async criar(req, res, next) {
    try {
      const pessoa = await this.service.criar(req.body);
      res.status(201).json(pessoa);
    } catch (err) {
      next(err);
    }
  }

  // PUT /pessoas/:id
  async atualizar(req, res, next) {
    try {
      const pessoa = await this.service.atualizar(req.params.id, req.body);
      res.status(200).json(pessoa);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /pessoas/:id
  async deletar(req, res, next) {
    try {
      await this.service.deletar(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PessoaController;
