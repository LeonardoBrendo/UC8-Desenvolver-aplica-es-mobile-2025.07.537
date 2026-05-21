// ============================================================
// controller/CarroController.js — handlers HTTP de Carro
// ============================================================
// Mesma estrutura do PessoaController.
// Diferenças importantes:
//   - criar e atualizar precisam tratar SequelizeUniqueConstraintError
//     (lançado quando uma placa duplicada é inserida)
//   - buscarPorPessoa usa req.params.pessoaId (não req.params.id)

const CarroService = require('../service/CarroService');

class CarroController {

  constructor() {
    this.service = new CarroService();
  }

  // GET /carros
  // 200 OK — retorna array com todos os carros (incluindo dados da pessoa)
  async listarTodos(req, res) {
    try {
      const carros = await this.service.listarTodos();
      res.status(200).json(carros);
    } catch (err) {
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }

  // GET /carros/:id
  // 200 OK — carro encontrado com dados da pessoa
  // 404 Not Found — id não existe
  async buscarPorId(req, res) {
    try {
      const carro = await this.service.buscarPorId(req.params.id);
      res.status(200).json(carro);
    } catch (err) {
      res.status(err.statusCode || 500).json({ erro: err.message });
    }
  }

  // GET /carros/pessoa/:pessoaId
  // 200 OK — lista de carros da pessoa
  // 404 Not Found — pessoaId não existe
  async buscarPorPessoa(req, res) {
    try {
      // Atenção: o parâmetro aqui é pessoaId, não id
      const carros = await this.service.buscarPorPessoa(req.params.pessoaId);
      res.status(200).json(carros);
    } catch (err) {
      res.status(err.statusCode || 500).json({ erro: err.message });
    }
  }

  // POST /carros
  // 201 Created — carro criado com sucesso
  // 400 Bad Request — dados inválidos ou campo obrigatório ausente
  // 404 Not Found — pessoaId não existe
  // 409 Conflict — placa já cadastrada
  async criar(req, res) {
    try {
      const carro = await this.service.criar(req.body);
      res.status(201).json(carro);
    } catch (err) {
      // SequelizeUniqueConstraintError: lançado pelo banco quando a placa já existe
      // O Sequelize informa qual campo e valor causaram o conflito
      if (err.name === 'SequelizeUniqueConstraintError') {
        const campo = err.errors?.[0]?.path ?? 'campo';
        const valor = err.errors?.[0]?.value ?? '';
        return res.status(409).json({
          erro: `Conflito: já existe um registro com o valor '${valor}' no campo '${campo}'`
        });
      }
      // SequelizeValidationError: validação do model falhou (ex: allowNull violado)
      if (err.name === 'SequelizeValidationError') {
        const mensagens = err.errors.map(e => e.message).join('; ');
        return res.status(400).json({ erro: mensagens });
      }
      // Erros do Service (400 ou 404) ou inesperados (500)
      res.status(err.statusCode || 500).json({ erro: err.message });
    }
  }

  // PUT /carros/:id
  // 200 OK — carro atualizado com sucesso
  // 400 Bad Request — dados inválidos
  // 404 Not Found — id não existe
  // 409 Conflict — nova placa já pertence a outro carro
  // 500 Internal Server Error
  async atualizar(req, res) {
    try {
      const carro = await this.service.atualizar(req.params.id, req.body);
      res.status(200).json(carro);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        const campo = err.errors?.[0]?.path ?? 'campo';
        const valor = err.errors?.[0]?.value ?? '';
        return res.status(409).json({
          erro: `Conflito: já existe um registro com o valor '${valor}' no campo '${campo}'`
        });
      }
      if (err.name === 'SequelizeValidationError') {
        const mensagens = err.errors.map(e => e.message).join('; ');
        return res.status(400).json({ erro: mensagens });
      }
      res.status(err.statusCode || 500).json({ erro: err.message });
    }
  }

  // DELETE /carros/:id
  // 204 No Content — carro removido com sucesso (sem corpo na resposta)
  // 404 Not Found — id não existe
  async deletar(req, res) {
    try {
      await this.service.deletar(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(err.statusCode || 500).json({ erro: err.message });
    }
  }
}

module.exports = CarroController;
