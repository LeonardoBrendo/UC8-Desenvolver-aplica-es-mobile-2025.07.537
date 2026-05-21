require('dotenv').config();

const express      = require('express');
const helmet       = require('helmet');
const cors         = require('cors');
const logger       = require('./config/logger');
const sequelize    = require('./config/sequelize');
const swaggerUi    = require('swagger-ui-express');
const swaggerSpec  = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');

require('./model/index');

const authRoute   = require('./route/AuthRoute');
const pessoaRoute = require('./route/PessoaRoute');
const carroRoute  = require('./route/CarroRoute');

const app   = express();
const PORTA = process.env.PORT || 3000;

// ─── Segurança ────────────────────────────────────────────────
// helmet adiciona ~12 headers HTTP de segurança automaticamente
app.use(helmet());

// cors define quais origens podem chamar a API
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// ─── Parsing ──────────────────────────────────────────────────
app.use(express.json());

// ─── Log de requisições HTTP via Winston ─────────────────────
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// ─── Documentação ────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ─── Rotas públicas ───────────────────────────────────────────
app.use('/auth', authRoute);

// ─── Rotas privadas (JWT obrigatório) ─────────────────────────
app.use('/pessoas', pessoaRoute);
app.use('/carros',  carroRoute);

// ─── Middleware de erro global ────────────────────────────────
// Deve ser registrado APÓS todas as rotas
app.use(errorHandler);

// ─── Inicialização ────────────────────────────────────────────
sequelize.sync().then(() => {
  app.listen(PORTA, () => {
    logger.info(`Servidor rodando em http://localhost:${PORTA}`);
    logger.info(`Swagger disponível em http://localhost:${PORTA}/api-docs`);
  });
}).catch(err => {
  logger.error(`Erro ao conectar com o banco: ${err.message}`);
  process.exit(1);
});

module.exports = app;
