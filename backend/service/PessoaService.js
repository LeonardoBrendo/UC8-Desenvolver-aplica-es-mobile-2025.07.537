// Camada de regras de negócio — Joi já validou a estrutura do body.
// Aqui ficam apenas as regras que dependem do banco:
//   - hashear a senha antes de salvar
//   - verificar se o ID existe

const bcrypt = require('bcryptjs');
const PessoaRepository = require('../repository/PessoaRepository');

class PessoaService {

  constructor() {
    this.repository = new PessoaRepository();
  }

  async listarTodos(page, limit) {
    return await this.repository.buscarTodos(page, limit);
  }

  async buscarPorId(id) {
    const pessoa = await this.repository.buscarPorId(id);

    if (!pessoa) {
      const err = new Error(`Pessoa com id ${id} não encontrada`);
      err.statusCode = 404;
      throw err;
    }

    return pessoa;
  }

  async criar(dados) {
    const hash = await bcrypt.hash(dados.senha, 10);
    return await this.repository.criar({ ...dados, senha: hash });
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);

    if (dados.senha) {
      dados = { ...dados, senha: await bcrypt.hash(dados.senha, 10) };
    }

    return await this.repository.atualizar(id, dados);
  }

  async deletar(id) {
    await this.buscarPorId(id);
    return await this.repository.deletar(id);
  }
}

module.exports = PessoaService;
