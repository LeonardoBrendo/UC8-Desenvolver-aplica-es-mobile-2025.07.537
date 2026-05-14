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
  }

}, {
  sequelize,           // instância de conexão usada por este model
  modelName: 'Pessoa', // nome interno do Sequelize (usado nas associações)
  tableName: 'pessoa', // nome real da tabela no PostgreSQL
  timestamps: false    // desativa as colunas createdAt e updatedAt
});

module.exports = Pessoa;
