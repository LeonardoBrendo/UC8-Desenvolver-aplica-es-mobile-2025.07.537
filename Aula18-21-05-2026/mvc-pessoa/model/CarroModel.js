// ============================================================
// model/CarroModel.js — define a tabela "carro" no banco
// ============================================================

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Carro extends Model {}

Carro.init({

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  marca: {
    type: DataTypes.STRING(100),
    allowNull: false // campo obrigatório
  },

  modelo: {
    type: DataTypes.STRING(100),
    allowNull: false // campo obrigatório
  },

  ano: {
    type: DataTypes.INTEGER
  },

  cor: {
    type: DataTypes.STRING(50)
  },

  placa: {
    type: DataTypes.STRING(10),
    unique: true // UNIQUE — não permite duas placas iguais no banco
                 // ao tentar inserir duplicata, o Sequelize lança SequelizeUniqueConstraintError
  },

  // pessoaId é a chave estrangeira que vincula o carro à pessoa dona.
  // field: 'pessoa_id' → diz ao Sequelize que no banco a coluna se chama pessoa_id,
  // mas no JavaScript usamos pessoaId (camelCase).
  // Sem o field, o Sequelize criaria uma coluna pessoaId no banco (inconsistente com o padrão SQL).
  pessoaId: {
    type: DataTypes.INTEGER,
    allowNull: false,      // todo carro precisa de um dono
    field: 'pessoa_id'     // nome real da coluna no PostgreSQL
  }

}, {
  sequelize,
  modelName: 'Carro',
  tableName: 'carro',
  timestamps: false
});

module.exports = Carro;
