const { Carro, Pessoa } = require('../model');

class CarroRepository {

  async buscarTodos(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Carro.findAndCountAll({
      include: [{ model: Pessoa, as: 'pessoa', attributes: { exclude: ['senha'] } }],
      order:  [['id', 'ASC']],
      limit,
      offset,
    });
    return { total: count, page, limit, data: rows };
  }

  async buscarPorId(id) {
    return await Carro.findByPk(id, {
      include: [{ model: Pessoa, as: 'pessoa', attributes: { exclude: ['senha'] } }],
    });
  }

  async buscarPorPessoa(pessoaId) {
    return await Carro.findAll({
      where: { pessoaId },
      order: [['id', 'ASC']],
    });
  }

  async criar(dados) {
    return await Carro.create(dados);
  }

  async atualizar(id, dados) {
    const carro = await Carro.findByPk(id);
    if (!carro) return null;
    return await carro.update(dados);
  }

  async deletar(id) {
    const carro = await Carro.findByPk(id);
    if (!carro) return null;
    await carro.destroy();
    return carro;
  }
}

module.exports = CarroRepository;
