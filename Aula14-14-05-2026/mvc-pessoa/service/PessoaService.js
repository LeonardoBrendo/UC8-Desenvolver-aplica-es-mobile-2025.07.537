// ============================================================
// service/PessoaService.js — regras de negócio da entidade Pessoa
// ============================================================
// A camada Service fica entre o Controller e o Repository.
// É aqui que ficam as validações e regras de negócio:
//   - "nome é obrigatório"
//   - "idade não pode ser negativa"
//   - "id deve existir antes de atualizar"
//
// Quando algo está errado, o Service lança um Error com a
// propriedade statusCode definida. O Controller captura esse
// erro e usa o statusCode para montar a resposta HTTP correta.

const PessoaRepository = require('../repository/PessoaRepository');

class PessoaService {

  constructor() {
    // Instancia o Repository — único ponto de acesso ao banco para Pessoa
    this.repository = new PessoaRepository();
  }

  // Retorna todas as pessoas — sem regras de negócio, apenas repassa
  async listarTodos() {
    return await this.repository.buscarTodos();
  }

  // Busca uma pessoa pelo id.
  // Se não existir, lança um erro com statusCode 404 (Not Found).
  // O Controller vai capturar esse erro e responder com status 404.
  async buscarPorId(id) {
    const pessoa = await this.repository.buscarPorId(id);

    if (!pessoa) {
      // Cria um Error comum e adiciona a propriedade statusCode
      // Isso elimina a necessidade de uma classe de erro separada
      const err = new Error(`Pessoa com id ${id} não encontrada`);
      err.statusCode = 404;
      throw err;
    }

    return pessoa;
  }

  // Valida os dados antes de criar.
  // Lança erro 400 (Bad Request) se qualquer campo obrigatório estiver ausente ou inválido.
  async criar(dados) {
    if (!dados.nome) {
      const err = new Error('Nome é obrigatório');
      err.statusCode = 400;
      throw err;
    }
    if (!dados.idade || dados.idade < 0) {
      const err = new Error('Idade inválida');
      err.statusCode = 400;
      throw err;
    }
    if (!dados.altura || dados.altura <= 0) {
      const err = new Error('Altura inválida');
      err.statusCode = 400;
      throw err;
    }

    return await this.repository.criar(dados);
  }

  // Valida que o id existe e que os novos dados são válidos antes de atualizar.
  async atualizar(id, dados) {
    // Reutiliza buscarPorId — já lança 404 se não encontrar
    await this.buscarPorId(id);

    if (!dados.nome) {
      const err = new Error('Nome é obrigatório');
      err.statusCode = 400;
      throw err;
    }
    if (!dados.idade || dados.idade < 0) {
      const err = new Error('Idade inválida');
      err.statusCode = 400;
      throw err;
    }
    if (!dados.altura || dados.altura <= 0) {
      const err = new Error('Altura inválida');
      err.statusCode = 400;
      throw err;
    }

    return await this.repository.atualizar(id, dados);
  }

  // Verifica se a pessoa existe antes de deletar.
  // Se não existir, buscarPorId já lança o 404.
  async deletar(id) {
    await this.buscarPorId(id);
    return await this.repository.deletar(id);
  }
}

module.exports = PessoaService;
