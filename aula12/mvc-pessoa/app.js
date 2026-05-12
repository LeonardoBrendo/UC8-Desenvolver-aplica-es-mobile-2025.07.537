// Importa o framework Express — responsável por criar e gerenciar o servidor HTTP
const express = require('express');

// Importa as rotas da entidade Pessoa
const pessoaRoute = require('./route/PessoaRoute');

// Importa o Swagger UI e a especificação gerada
const swaggerUi   = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Cria a aplicação Express
const app = express();

// Define a porta em que o servidor vai escutar as requisições
const PORTA = 3000;

// Middleware que ensina o Express a ler o corpo das requisições no formato JSON
// Sem isso, req.body seria undefined nos métodos POST e PUT
app.use(express.json());

// Interface visual do Swagger — acessível em http://localhost:3000/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Registra as rotas de Pessoa sob o prefixo /pessoas
// Todas as rotas definidas em PessoaRoute serão acessadas como /pessoas/...
app.use('/pessoas', pessoaRoute);

// Inicia o servidor na porta definida e exibe uma mensagem de confirmação no console
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
  console.log(`Documentação Swagger: http://localhost:${PORTA}/api-docs`);
});
