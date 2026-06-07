// ============================================================
// model/PessoaModel.js — define a tabela "pessoa" no banco
// ============================================================

// DataTypes: tipos de dados das colunas (STRING, INTEGER, DECIMAL…)
// Model: classe base do Sequelize — fornece findAll, findByPk, create, etc.
const { DataTypes, Model } = require('sequelize');

// Importa a conexão com o banco criada em config/sequelize.js
const sequelize = require('../config/sequelize');

// A classe Pessoa herda de Model, ganhando todos os métodos da ORM
class Pessoa extends Model {}

// init() mapeia os atributos da classe para as colunas da tabela
Pessoa.init({

  id: {
    type: DataTypes.INTEGER, // INT no banco
    primaryKey: true,         // PRIMARY KEY
    autoIncrement: true       // equivalente a SERIAL do PostgreSQL
  },

  nome: {
    type: DataTypes.STRING(100), // VARCHAR(100)
    allowNull: false              // NOT NULL — campo obrigatório no banco
  },

  altura: {
    type: DataTypes.DECIMAL(4, 2) // ex: 1.75 (4 dígitos no total, 2 decimais)
  },

  profissao: {
    type: DataTypes.STRING(100)   // campo opcional (sem allowNull: false)
  },

  idade: {
    type: DataTypes.INTEGER
  },

  cidade: {
    type: DataTypes.STRING(100)
  },

  // ─── Campos de autenticação ───────────────────────────────

  email: {
    type: DataTypes.STRING(150), // VARCHAR(150) — tamanho suficiente para emails reais
    allowNull: false,             // NOT NULL — obrigatório no cadastro
    unique: true                  // UNIQUE — não podem existir dois cadastros com o mesmo email
  },

  senha: {
    // A senha nunca é salva como texto puro.
    // O bcrypt transforma "minhasenha123" em um hash de 60 caracteres,
    // por isso o tipo é STRING(255) — espaço suficiente para o hash.
    // Exemplo de hash: $2a$10$Xk9wQZv...
    type: DataTypes.STRING(255),
    allowNull: false // NOT NULL — obrigatório no cadastro
  }

}, {
  sequelize,           // instância de conexão usada por este model
  modelName: 'Pessoa', // nome interno do Sequelize (usado nas associações)
  tableName: 'pessoa', // nome real da tabela no PostgreSQL
  timestamps: false    // desativa as colunas createdAt e updatedAt
});

module.exports = Pessoa;
