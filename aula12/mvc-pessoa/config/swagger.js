const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Pessoa',
      version: '1.0.0',
      description: 'CRUD de Pessoa com Node.js, MVC, Service, Repository e PostgreSQL',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        Pessoa: {
          type: 'object',
          properties: {
            id:        { type: 'integer', example: 1 },
            nome:      { type: 'string',  example: 'Maria Silva' },
            idade:     { type: 'integer', example: 30 },
            altura:    { type: 'number',  format: 'float', example: 1.68 },
            profissao: { type: 'string',  example: 'Engenheira' },
            cidade:    { type: 'string',  example: 'São Paulo' },
          },
        },
        PessoaInput: {
          type: 'object',
          required: ['nome', 'idade', 'altura'],
          properties: {
            nome:      { type: 'string',  example: 'Maria Silva' },
            idade:     { type: 'integer', example: 30 },
            altura:    { type: 'number',  format: 'float', example: 1.68 },
            profissao: { type: 'string',  example: 'Engenheira' },
            cidade:    { type: 'string',  example: 'São Paulo' },
          },
        },
        Erro: {
          type: 'object',
          properties: {
            erro: { type: 'string', example: 'Mensagem de erro' },
          },
        },
      },
    },
  },
  apis: ['./config/swagger-routes.js'],
};

module.exports = swaggerJsdoc(options);
