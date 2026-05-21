// Camada de regras de negócio — Joi já validou a estrutura do body.
// Aqui ficam apenas as regras que dependem do banco:
//   - verificar se pessoaId existe antes de criar/atualizar
//   - verificar se o ID do carro existe

const CarroRepository  = require('../repository/CarroRepository');
const PessoaRepository = require('../repository/PessoaRepository');

class CarroService {

  constructor() {
    this.repository       = new CarroRepository();
    this.pessoaRepository = new PessoaRepository();
  }

  async listarTodos(page, limit) {
    return await this.repository.buscarTodos(page, limit);
  }

  async buscarPorId(id) {
    const carro = await this.repository.buscarPorId(id);

    if (!carro) {
      const err = new Error(`Carro com id ${id} não encontrado`);
      err.statusCode = 404;
      throw err;
    }

    return carro;
  }

  async buscarPorPessoa(pessoaId) {
    const pessoa = await this.pessoaRepository.buscarPorId(pessoaId);

    if (!pessoa) {
      const err = new Error(`Pessoa com id ${pessoaId} não encontrada`);
      err.statusCode = 404;
      throw err;
    }

    return await this.repository.buscarPorPessoa(pessoaId);
  }

  async criar(dados) {
    const pessoa = await this.pessoaRepository.buscarPorId(dados.pessoaId);
    if (!pessoa) {
      const err = new Error(`Pessoa com id ${dados.pessoaId} não encontrada`);
      err.statusCode = 404;
      throw err;
    }
    return await this.repository.criar(dados);
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);

    if (dados.pessoaId) {
      const pessoa = await this.pessoaRepository.buscarPorId(dados.pessoaId);
      if (!pessoa) {
        const err = new Error(`Pessoa com id ${dados.pessoaId} não encontrada`);
        err.statusCode = 404;
        throw err;
      }
    }

    return await this.repository.atualizar(id, dados);
  }

  async deletar(id) {
    await this.buscarPorId(id);
    return await this.repository.deletar(id);
  }
}

module.exports = CarroService;
