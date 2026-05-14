require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST, // endereço do servidor (ex: localhost)
        port: process.env.DB_PORT, // porta (padrão PostgreSQL: 5432)
        dialect: 'postgres',          // diz ao Sequelize qual banco usar
        logging: false                // false = não imprime SQL no console
                                    // troque por console.log para depurar
    }
);

module.exports = sequelize;