// ============================================================
// app.js — ponto de entrada da aplicação
// Responsável por: configurar middlewares, registrar rotas
// e conectar ao banco antes de subir o servidor.
// ============================================================

// dotenv lê o arquivo .env e injeta as variáveis em process.env
// Deve ser chamado ANTES de qualquer require que use process.env
require('dotenv').config();

const express = require('express');
const morgan  = require('morgan');

// Importa os roteadores de cada entidade
const pessoaRoute = require('./route/PessoaRoute');
const carroRoute  = require('./route/CarroRoute');

// Swagger — documentação interativa dos endpoints
const swaggerUi   = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Instância do Sequelize (conexão com o PostgreSQL)
const sequelize   = require('./config/sequelize');

// Importar o index de models força o registro das associações
// (Pessoa.hasMany / Carro.belongsTo) antes do sync()
require('./model/index');

// Cria a aplicação Express
const app = express();

// Porta lida do .env; usa 3000 como padrão se não estiver definida
const PORTA = process.env.PORT || 3000;

// ─── Middlewares globais ─────────────────────────────────────
// morgan 'dev' exibe no console: método, rota, status e tempo de resposta
// Exemplo: GET /pessoas 200 12.345 ms - 87
app.use(morgan('dev'));

// Permite que o Express leia JSON no corpo (req.body) das requisições
app.use(express.json());

// ─── Rotas ───────────────────────────────────────────────────
// Swagger UI disponível em /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Todas as rotas de pessoa ficam sob o prefixo /pessoas
app.use('/pessoas', pessoaRoute);

// Todas as rotas de carro ficam sob o prefixo /carros
app.use('/carros',  carroRoute);

// ─── Inicialização ───────────────────────────────────────────
// sequelize.sync() verifica se as tabelas existem e as cria se necessário.
// Não apaga dados existentes (ao contrário de sync({ force: true })).
sequelize.sync().then(() => {
  app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
    console.log(`Documentação Swagger: http://localhost:${PORTA}/api-docs`);
  });
}).catch(err => {
  // Se a conexão com o banco falhar, o servidor não deve subir
  console.error('Erro ao conectar com o banco de dados:', err.message);
});
