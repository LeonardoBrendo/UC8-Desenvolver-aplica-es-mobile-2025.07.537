// ============================================================
// controller/PessoaController.js — handlers HTTP de Pessoa
// ============================================================
// A camada Controller é a ponte entre o HTTP e o Service.
// Responsabilidades:
//   1. Ler dados da requisição (req.params, req.body)
//   2. Chamar o método correto do Service
//   3. Responder com o status HTTP e o JSON adequados
//
// Tratamento de erros:
//   Cada método tem seu próprio try/catch.
//   Se o Service lançar um erro com err.statusCode, usamos esse código.
//   Caso contrário, respondemos com 500 (erro interno inesperado).
//
// Fluxo resumido:
//   Route → Controller → Service → Repository → Banco

const PessoaService = require('../service/PessoaService');

class PessoaController {

  constructor() {
    // Instancia o Service — toda lógica de negócio fica lá
    this.service = new PessoaService();
  }

  // GET /pessoas
  // 200 OK — retorna array com todas as pessoas
  async listarTodos(req, res) {
    try {
      const pessoas = await this.service.listarTodos();
      res.status(200).json(pessoas);
    } catch (err) {
      // listarTodos não tem validações — qualquer erro aqui é inesperado
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }

  // GET /pessoas/:id
  // 200 OK — pessoa encontrada
  // 404 Not Found — id não existe (err.statusCode = 404 vindo do Service)
  async buscarPorId(req, res) {
    try {
      // req.params.id contém o valor dinâmico da URL (ex: /pessoas/3 → id = '3')
      const pessoa = await this.service.buscarPorId(req.params.id);
      res.status(200).json(pessoa);
    } catch (err) {
      // err.statusCode é 404 se o Service não encontrou a pessoa
      // || 500 garante um fallback caso o erro não tenha statusCode
      res.status(err.statusCode || 500).json({ erro: err.message });
    }
  }

  // POST /pessoas
  // 201 Created — pessoa criada com sucesso
  // 400 Bad Request — campo inválido ou ausente (err.statusCode = 400 do Service)
  async criar(req, res) {
    try {
      // req.body contém o JSON enviado pelo cliente no corpo da requisição
      const pessoa = await this.service.criar(req.body);
      res.status(201).json(pessoa);
    } catch (err) {
      // SequelizeValidationError: validação de modelo falhou dentro do Sequelize
      // (ex: allowNull: false violado diretamente no banco)
      if (err.name === 'SequelizeValidationError') {
        const mensagens = err.errors.map(e => e.message).join('; ');
        return res.status(400).json({ erro: mensagens });
      }
      // err.statusCode = 400 se o Service rejeitou os dados
      res.status(err.statusCode || 500).json({ erro: err.message });
    }
  }

  // PUT /pessoas/:id
  // 200 OK — pessoa atualizada com sucesso
  // 400 Bad Request — dados inválidos
  // 404 Not Found — id não existe
  async atualizar(req, res) {
    try {
      const pessoa = await this.service.atualizar(req.params.id, req.body);
      res.status(200).json(pessoa);
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        const mensagens = err.errors.map(e => e.message).join('; ');
        return res.status(400).json({ erro: mensagens });
      }
      res.status(err.statusCode || 500).json({ erro: err.message });
    }
  }

  // DELETE /pessoas/:id
  // 204 No Content — removida com sucesso (sem corpo na resposta)
  // 404 Not Found — id não existe
  async deletar(req, res) {
    try {
      await this.service.deletar(req.params.id);
      // 204 = sucesso, mas sem retornar dados (a pessoa foi deletada, não há o que mostrar)
      res.status(204).send();
    } catch (err) {
      res.status(err.statusCode || 500).json({ erro: err.message });
    }
  }
}

module.exports = PessoaController;
