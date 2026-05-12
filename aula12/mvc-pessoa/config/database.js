const {Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5440,
    database: 'senac',
    user: 'postgres',
    password: 'postgres'
});

module.exports = pool;