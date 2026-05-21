// ============================================================
// service/CarroService.js — regras de negócio da entidade Carro
// ============================================================
// Mesma responsabilidade do PessoaService: validações e regras.
// Erros são lançados com a propriedade statusCode para que o
// Controller saiba qual status HTTP retornar ao cliente.

const CarroRepository  = require('../repository/CarroRepository');
const PessoaRepository = require('../repository/PessoaRepository');

class CarroService {

  constructor() {
    this.repository        = new CarroRepository();
    // CarroService também precisa consultar pessoas (para validar pessoaId)
    this.pessoaRepository  = new PessoaRepository();
  }

  async listarTodos() {
    return await this.repository.buscarTodos();
  }

  // Busca carro pelo id; lança 404 se não existir
  async buscarPorId(id) {
    const carro = await this.repository.buscarPorId(id);

    if (!carro) {
      const err = new Error(`Carro com id ${id} não encontrado`);
      err.statusCode = 404;
      throw err;
    }

    return carro;
  }

  // Verifica se a pessoa existe antes de listar os carros dela; lança 404 se não
  async buscarPorPessoa(pessoaId) {
    const pessoa = await this.pessoaRepository.buscarPorId(pessoaId);

    if (!pessoa) {
      const err = new Error(`Pessoa com id ${pessoaId} não encontrada`);
      err.statusCode = 404;
      throw err;
    }

    return await this.repository.buscarPorPessoa(pessoaId);
  }

  // Valida campos obrigatórios e existência da pessoa antes de criar o carro
  async criar(dados) {
    if (!dados.marca) {
      const err = new Error('Marca é obrigatória');
      err.statusCode = 400;
      throw err;
    }
    if (!dados.modelo) {
      const err = new Error('Modelo é obrigatório');
      err.statusCode = 400;
      throw err;
    }
    if (!dados.pessoaId) {
      const err = new Error('pessoaId é obrigatório');
      err.statusCode = 400;
      throw err;
    }

    // Garante que a pessoa dona do carro existe antes de inserir
    const pessoa = await this.pessoaRepository.buscarPorId(dados.pessoaId);
    if (!pessoa) {
      const err = new Error(`Pessoa com id ${dados.pessoaId} não encontrada`);
      err.statusCode = 404;
      throw err;
    }

    // Se a placa já existir, o banco lança SequelizeUniqueConstraintError —
    // esse erro é capturado e tratado no Controller (status 409)
    return await this.repository.criar(dados);
  }

  async atualizar(id, dados) {
    // Garante que o carro existe; já lança 404 se não encontrar
    await this.buscarPorId(id);

    if (!dados.marca) {
      const err = new Error('Marca é obrigatória');
      err.statusCode = 400;
      throw err;
    }
    if (!dados.modelo) {
      const err = new Error('Modelo é obrigatório');
      err.statusCode = 400;
      throw err;
    }

    // pessoaId é opcional no update — só valida se foi enviado
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
