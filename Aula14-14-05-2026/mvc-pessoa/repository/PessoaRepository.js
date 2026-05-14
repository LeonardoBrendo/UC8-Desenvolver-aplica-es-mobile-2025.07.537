// Importa o pool de conexões configurado com o PostgreSQL
const pool = require('../config/database');

// Importa o Model para transformar os dados brutos do banco em objetos estruturados
const PessoaModel = require('../model/PessoaModel');

// A camada Repository é responsável EXCLUSIVAMENTE por se comunicar com o banco de dados.
// Ela contém as queries SQL e não possui regras de negócio.
class PessoaRepository {

  // Busca todas as pessoas cadastradas no banco, ordenadas pelo id
  async buscarTodos() {
    // pool.query executa um comando SQL e retorna uma Promise com o resultado
    const resultado = await pool.query('SELECT * FROM pessoa ORDER BY id');

    // resultado.rows é um array com todas as linhas retornadas pelo banco
    // .map() transforma cada linha bruta em um objeto PessoaModel
    return resultado.rows.map(row => new PessoaModel(row));
  }

  // Busca uma pessoa específica pelo id
  async buscarPorId(id) {
    // $1 é um parâmetro seguro do PostgreSQL — evita SQL Injection
    // O array [id] fornece o valor que substituirá o $1
    const resultado = await pool.query('SELECT * FROM pessoa WHERE id = $1', [id]);

    // Se não encontrou nenhuma linha, retorna null para indicar ausência
    if (resultado.rows.length === 0) return null;

    // Retorna a primeira (e única) linha como um objeto PessoaModel
    return new PessoaModel(resultado.rows[0]);
  }

  // Insere uma nova pessoa no banco de dados
  async criar(dados) {
    // Desestrutura o objeto recebido para obter cada campo separadamente
    const { nome, altura, profissao, idade, cidade } = dados;

    const resultado = await pool.query(
      // RETURNING * faz o PostgreSQL retornar a linha recém-inserida (incluindo o id gerado)
      'INSERT INTO pessoa (nome, altura, profissao, idade, cidade) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, altura, profissao, idade, cidade]
    );

    // Retorna a pessoa criada já com o id gerado pelo banco
    return new PessoaModel(resultado.rows[0]);
  }

  // Atualiza os dados de uma pessoa existente
  async atualizar(id, dados) {
    const { nome, altura, profissao, idade, cidade } = dados;

    const resultado = await pool.query(
      // O id é passado como $6 para identificar qual linha será alterada
      'UPDATE pessoa SET nome = $1, altura = $2, profissao = $3, idade = $4, cidade = $5 WHERE id = $6 RETURNING *',
      [nome, altura, profissao, idade, cidade, id]
    );

    // Se nenhuma linha foi afetada, significa que o id não existe no banco
    if (resultado.rows.length === 0) return null;

    return new PessoaModel(resultado.rows[0]);
  }

  // Remove uma pessoa do banco de dados pelo id
  async deletar(id) {
    // RETURNING * retorna os dados da pessoa antes de deletá-la
    const resultado = await pool.query('DELETE FROM pessoa WHERE id = $1 RETURNING *', [id]);

    // Se nenhuma linha foi deletada, o id não existia
    if (resultado.rows.length === 0) return null;

    return new PessoaModel(resultado.rows[0]);
  }
}

module.exports = PessoaRepository;
