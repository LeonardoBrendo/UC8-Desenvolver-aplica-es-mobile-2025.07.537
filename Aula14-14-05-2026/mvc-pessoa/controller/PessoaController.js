// Importa o Service que contém as regras de negócio
const PessoaService = require('../service/PessoaService');

// A camada Controller é responsável por receber as requisições HTTP,
// chamar o Service adequado e devolver a resposta HTTP ao cliente.
// Ela NÃO contém regras de negócio nem queries SQL.
class PessoaController {

  constructor() {
    // Instancia o service para poder usar seus métodos
    this.service = new PessoaService();
  }

  // Trata GET /pessoas — retorna todas as pessoas
  async listarTodos(req, res) {
    try {
      const pessoas = await this.service.listarTodos();

      // Status 200 = OK — retorna o array de pessoas em formato JSON
      res.status(200).json(pessoas);
    } catch (erro) {
      // Status 500 = Erro interno do servidor (problema inesperado)
      res.status(500).json({ erro: erro.message });
    }
  }

  // Trata GET /pessoas/:id — retorna uma pessoa específica
  async buscarPorId(req, res) {
    try {
      // req.params.id captura o valor do :id na URL (ex: /pessoas/3 → id = "3")
      const pessoa = await this.service.buscarPorId(req.params.id);

      // Status 200 = OK
      res.status(200).json(pessoa);
    } catch (erro) {
      // Status 404 = Não encontrado
      res.status(404).json({ erro: erro.message });
    }
  }

  // Trata POST /pessoas — cria uma nova pessoa
  async criar(req, res) {
    try {
      // req.body contém os dados enviados pelo cliente no corpo da requisição (JSON)
      const pessoa = await this.service.criar(req.body);

      // Status 201 = Created — indica que um recurso foi criado com sucesso
      res.status(201).json(pessoa);
    } catch (erro) {
      // Status 400 = Bad Request — os dados enviados pelo cliente são inválidos
      res.status(400).json({ erro: erro.message });
    }
  }

  // Trata PUT /pessoas/:id — atualiza todos os dados de uma pessoa
  async atualizar(req, res) {
    try {
      // Combina o id da URL com os dados do corpo para atualizar
      const pessoa = await this.service.atualizar(req.params.id, req.body);

      // Status 200 = OK
      res.status(200).json(pessoa);
    } catch (erro) {
      // Se o erro menciona "não encontrada", retorna 404; caso contrário, 400
      const status = erro.message.includes('não encontrada') ? 404 : 400;
      res.status(status).json({ erro: erro.message });
    }
  }

  // Trata DELETE /pessoas/:id — remove uma pessoa
  async deletar(req, res) {
    try {
      const pessoa = await this.service.deletar(req.params.id);

      // Retorna uma mensagem de confirmação junto com os dados da pessoa deletada
      res.status(200).json({ mensagem: 'Pessoa deletada com sucesso', pessoa });
    } catch (erro) {
      // Status 404 = Não encontrado
      res.status(404).json({ erro: erro.message });
    }
  }
}

module.exports = PessoaController;
