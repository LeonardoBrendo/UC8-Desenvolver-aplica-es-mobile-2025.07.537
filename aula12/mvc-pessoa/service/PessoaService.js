// Importa o Repository para delegar as operações de banco de dados
const PessoaRepository = require('../repository/PessoaRepository');

// A camada Service contém as REGRAS DE NEGÓCIO da aplicação.
// Ela fica entre o Controller (que trata HTTP) e o Repository (que acessa o banco).
// É aqui que validamos dados, aplicamos lógica e tomamos decisões.
class PessoaService {

  constructor() {
    // Instancia o repository para poder usar seus métodos
    this.repository = new PessoaRepository();
  }

  // Retorna a lista de todas as pessoas — sem regra de negócio adicional aqui
  async listarTodos() {
    return await this.repository.buscarTodos();
  }

  // Busca uma pessoa por id e lança um erro se ela não existir
  async buscarPorId(id) {
    const pessoa = await this.repository.buscarPorId(id);

    // Regra de negócio: se não encontrou, lançamos um erro com mensagem clara
    // O Controller vai capturar esse erro e devolver o status HTTP correto
    if (!pessoa) throw new Error(`Pessoa com id ${id} não encontrada`);

    return pessoa;
  }

  // Valida e cria uma nova pessoa
  async criar(dados) {
    // Regras de negócio: campos obrigatórios e valores válidos
    if (!dados.nome) throw new Error('Nome é obrigatório');
    if (!dados.idade || dados.idade < 0) throw new Error('Idade inválida');
    if (!dados.altura || dados.altura <= 0) throw new Error('Altura inválida');

    // Somente chama o banco se os dados passaram nas validações
    return await this.repository.criar(dados);
  }

  // Valida e atualiza uma pessoa existente
  async atualizar(id, dados) {
    // Primeiro verifica se a pessoa existe (reutilizando o método buscarPorId)
    // Se não existir, o erro já é lançado dentro do buscarPorId
    await this.buscarPorId(id);

    // Valida os dados novos antes de enviar ao banco
    if (!dados.nome) throw new Error('Nome é obrigatório');
    if (!dados.idade || dados.idade < 0) throw new Error('Idade inválida');
    if (!dados.altura || dados.altura <= 0) throw new Error('Altura inválida');

    return await this.repository.atualizar(id, dados);
  }

  // Verifica se a pessoa existe e a remove
  async deletar(id) {
    // Garante que a pessoa existe antes de tentar deletar
    await this.buscarPorId(id);

    return await this.repository.deletar(id);
  }
}

module.exports = PessoaService;
