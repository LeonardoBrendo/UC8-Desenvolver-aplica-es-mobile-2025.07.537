// ============================================================
// repository/CarroRepository.js — acesso ao banco via Sequelize
// ============================================================

const { Carro, Pessoa } = require('../model');

class CarroRepository {

  // Equivalente SQL:
  //   SELECT carro.*, pessoa.* FROM carro
  //   JOIN pessoa ON carro.pessoa_id = pessoa.id
  //   ORDER BY carro.id ASC
  //
  // include → instrui o Sequelize a fazer o JOIN com a tabela pessoa
  // as: 'pessoa' → deve coincidir com o apelido definido em belongsTo
  async buscarTodos() {
    return await Carro.findAll({
      include: [{ model: Pessoa, as: 'pessoa' }],
      order: [['id', 'ASC']]
    });
  }

  // Equivalente SQL:
  //   SELECT carro.*, pessoa.* FROM carro
  //   JOIN pessoa ON carro.pessoa_id = pessoa.id
  //   WHERE carro.id = :id LIMIT 1
  async buscarPorId(id) {
    return await Carro.findByPk(id, {
      include: [{ model: Pessoa, as: 'pessoa' }]
    });
  }

  // Equivalente SQL:
  //   SELECT * FROM carro WHERE pessoa_id = :pessoaId ORDER BY id ASC
  // Não inclui JOIN aqui — retorna apenas os carros, sem os dados da pessoa
  async buscarPorPessoa(pessoaId) {
    return await Carro.findAll({
      where: { pessoaId },
      order: [['id', 'ASC']]
    });
  }

  // Equivalente SQL: INSERT INTO carro (...) VALUES (...)
  async criar(dados) {
    return await Carro.create(dados);
  }

  // Equivalente SQL: UPDATE carro SET ... WHERE id = :id
  async atualizar(id, dados) {
    const carro = await Carro.findByPk(id);
    if (!carro) return null;
    return await carro.update(dados);
  }

  // Equivalente SQL: DELETE FROM carro WHERE id = :id
  async deletar(id) {
    const carro = await Carro.findByPk(id);
    if (!carro) return null;
    await carro.destroy();
    return carro;
  }
}

module.exports = CarroRepository;
