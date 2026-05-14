// ============================================================
// repository/PessoaRepository.js — acesso ao banco via Sequelize
// ============================================================
// A camada Repository é a única que fala com o banco de dados.
// Ela usa os métodos do Sequelize (findAll, findByPk, create…)
// no lugar de queries SQL escritas manualmente.
// O Service chama o Repository, mas nunca acessa o banco direto.

const { Pessoa } = require('../model');

class PessoaRepository {

  // Equivalente SQL: SELECT * FROM pessoa ORDER BY id ASC
  async buscarTodos() {
    return await Pessoa.findAll({ order: [['id', 'ASC']] });
  }

  // Equivalente SQL: SELECT * FROM pessoa WHERE id = :id LIMIT 1
  // findByPk = find By Primary Key
  // Retorna null se não encontrar — o Service trata esse caso
  async buscarPorId(id) {
    return await Pessoa.findByPk(id);
  }

  // Equivalente SQL: INSERT INTO pessoa (...) VALUES (...)
  // dados é um objeto JS com os campos da tabela
  async criar(dados) {
    return await Pessoa.create(dados);
  }

  // Equivalente SQL: UPDATE pessoa SET ... WHERE id = :id
  // update() atualiza somente os campos presentes em 'dados'
  // e retorna a instância atualizada
  async atualizar(id, dados) {
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) return null;
    return await pessoa.update(dados);
  }

  // Equivalente SQL: DELETE FROM pessoa WHERE id = :id
  // destroy() remove o registro; retornamos a instância para confirmar ao chamador
  async deletar(id) {
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) return null;
    await pessoa.destroy();
    return pessoa;
  }
}

module.exports = PessoaRepository;
