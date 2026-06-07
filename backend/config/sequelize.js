// ============================================================
// config/sequelize.js — instância única da conexão com o banco
// ============================================================

// dotenv carrega o .env para process.env antes de lermos as variáveis
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Cria a conexão com o PostgreSQL usando as variáveis do .env.
// Nunca escreva senha ou usuário diretamente aqui — use sempre process.env.
const sequelize = new Sequelize(
  process.env.DB_NAME, // nome do banco (ex: senac)
  process.env.DB_USER, // usuário (ex: postgres)
  process.env.DB_PASS, // senha
  {
    host:    process.env.DB_HOST, // endereço do servidor (ex: localhost)
    port:    process.env.DB_PORT, // porta (padrão PostgreSQL: 5432)
    dialect: 'postgres',          // diz ao Sequelize qual banco usar
    logging: false                // false = não imprime SQL no console
                                  // troque por console.log para depurar
  }
);

// Exporta a instância para ser reutilizada em models e no app.js
module.exports = sequelize;
