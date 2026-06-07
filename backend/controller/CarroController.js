// Validação de entrada é feita pelo middleware Joi antes de chegar aqui.
// Erros de negócio são repassados via next(err) ao middleware errorHandler.

const CarroService = require('../service/CarroService');

class CarroController {

  constructor() {
    this.service = new CarroService();
  }

  // GET /carros?page=1&limit=10
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

  // GET /carros/:id
  async buscarPorId(req, res, next) {
    try {
      const carro = await this.service.buscarPorId(req.params.id);
      res.status(200).json(carro);
    } catch (err) {
      next(err);
    }
  }

  // GET /carros/pessoa/:pessoaId
  async buscarPorPessoa(req, res, next) {
    try {
      const carros = await this.service.buscarPorPessoa(req.params.pessoaId);
      res.status(200).json(carros);
    } catch (err) {
      next(err);
    }
  }

  // POST /carros
  async criar(req, res, next) {
    try {
      const carro = await this.service.criar(req.body);
      res.status(201).json(carro);
    } catch (err) {
      next(err);
    }
  }

  // PUT /carros/:id
  async atualizar(req, res, next) {
    try {
      const carro = await this.service.atualizar(req.params.id, req.body);
      res.status(200).json(carro);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /carros/:id
  async deletar(req, res, next) {
    try {
      await this.service.deletar(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CarroController;
