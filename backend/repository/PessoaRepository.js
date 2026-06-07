const { Pessoa } = require('../model');

class PessoaRepository {

  // Retorna página de pessoas + total de registros para o controller montar a resposta
  async buscarTodos(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Pessoa.findAndCountAll({
      order: [['id', 'ASC']],
      limit,
      offset,
      attributes: { exclude: ['senha'] }, // nunca expõe a senha nas listagens
    });
    return { total: count, page, limit, data: rows };
  }

  async buscarPorId(id) {
    return await Pessoa.findByPk(id, {
      attributes: { exclude: ['senha'] },
    });
  }

  async criar(dados) {
    const pessoa = await Pessoa.create(dados);
    const { senha: _, ...semSenha } = pessoa.toJSON();
    return semSenha;
  }

  async atualizar(id, dados) {
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) return null;
    await pessoa.update(dados);
    const { senha: _, ...semSenha } = pessoa.toJSON();
    return semSenha;
  }

  async deletar(id) {
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) return null;
    await pessoa.destroy();
    return pessoa;
  }
}

module.exports = PessoaRepository;
