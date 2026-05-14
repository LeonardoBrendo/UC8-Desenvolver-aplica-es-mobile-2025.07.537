const paramId = (description) => ({
  in: 'path', name: 'id', required: true,
  schema: { type: 'integer' }, description
});

const resErro    = { content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro'       } } } };
const resPessoa  = { content: { 'application/json': { schema: { $ref: '#/components/schemas/Pessoa'     } } } };
const resCarro   = { content: { 'application/json': { schema: { $ref: '#/components/schemas/Carro'      } } } };
const resPessoas = { content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Pessoa' } } } } };
const resCarros  = { content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Carro'  } } } } };

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API Pessoa + Carro',
    version: '2.0.0',
    description: 'CRUD de Pessoa e Carro com Node.js, MVC, Sequelize ORM e PostgreSQL',
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
      Carro: {
        type: 'object',
        properties: {
          id:       { type: 'integer', example: 1 },
          marca:    { type: 'string',  example: 'Toyota' },
          modelo:   { type: 'string',  example: 'Corolla' },
          ano:      { type: 'integer', example: 2022 },
          cor:      { type: 'string',  example: 'Prata' },
          placa:    { type: 'string',  example: 'ABC-1234' },
          pessoaId: { type: 'integer', example: 1 },
          pessoa:   { $ref: '#/components/schemas/Pessoa' },
        },
      },
      CarroInput: {
        type: 'object',
        required: ['marca', 'modelo', 'pessoaId'],
        properties: {
          marca:    { type: 'string',  example: 'Toyota' },
          modelo:   { type: 'string',  example: 'Corolla' },
          ano:      { type: 'integer', example: 2022 },
          cor:      { type: 'string',  example: 'Prata' },
          placa:    { type: 'string',  example: 'ABC-1234' },
          pessoaId: { type: 'integer', example: 1 },
        },
      },
      Erro: {
        type: 'object',
        properties: { erro: { type: 'string', example: 'Mensagem de erro' } },
      },
    },
  },

  paths: {
    // ─── Pessoas ────────────────────────────────────────────────────────────
    '/pessoas': {
      get: {
        summary: 'Lista todas as pessoas',
        tags: ['Pessoas'],
        responses: {
          200: { description: 'OK — lista retornada com sucesso',            ...resPessoas },
          500: { description: 'Internal Server Error — erro no servidor',    ...resErro    },
        },
      },
      post: {
        summary: 'Cria uma nova pessoa',
        tags: ['Pessoas'],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PessoaInput' } } } },
        responses: {
          201: { description: 'Created — pessoa criada com sucesso',         ...resPessoa },
          400: { description: 'Bad Request — dados inválidos ou ausentes',   ...resErro   },
          500: { description: 'Internal Server Error — erro no servidor',    ...resErro   },
        },
      },
    },
    '/pessoas/{id}': {
      get: {
        summary: 'Busca uma pessoa pelo ID',
        tags: ['Pessoas'],
        parameters: [paramId('ID da pessoa')],
        responses: {
          200: { description: 'OK — pessoa encontrada',                      ...resPessoa },
          404: { description: 'Not Found — pessoa não encontrada',           ...resErro   },
          500: { description: 'Internal Server Error — erro no servidor',    ...resErro   },
        },
      },
      put: {
        summary: 'Atualiza os dados de uma pessoa',
        tags: ['Pessoas'],
        parameters: [paramId('ID da pessoa')],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PessoaInput' } } } },
        responses: {
          200: { description: 'OK — pessoa atualizada com sucesso',          ...resPessoa },
          400: { description: 'Bad Request — dados inválidos ou ausentes',   ...resErro   },
          404: { description: 'Not Found — pessoa não encontrada',           ...resErro   },
          500: { description: 'Internal Server Error — erro no servidor',    ...resErro   },
        },
      },
      delete: {
        summary: 'Remove uma pessoa pelo ID',
        tags: ['Pessoas'],
        parameters: [paramId('ID da pessoa')],
        responses: {
          204: { description: 'No Content — pessoa removida com sucesso' },
          404: { description: 'Not Found — pessoa não encontrada',           ...resErro },
          500: { description: 'Internal Server Error — erro no servidor',    ...resErro },
        },
      },
    },

    // ─── Carros ─────────────────────────────────────────────────────────────
    '/carros': {
      get: {
        summary: 'Lista todos os carros com os dados da pessoa dona',
        tags: ['Carros'],
        responses: {
          200: { description: 'OK — lista retornada com sucesso',            ...resCarros },
          500: { description: 'Internal Server Error — erro no servidor',    ...resErro   },
        },
      },
      post: {
        summary: 'Cria um novo carro vinculado a uma pessoa',
        tags: ['Carros'],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CarroInput' } } } },
        responses: {
          201: { description: 'Created — carro criado com sucesso',          ...resCarro  },
          400: { description: 'Bad Request — dados inválidos ou ausentes',   ...resErro   },
          404: { description: 'Not Found — pessoaId não existe',             ...resErro   },
          409: { description: 'Conflict — placa já cadastrada',              ...resErro   },
          500: { description: 'Internal Server Error — erro no servidor',    ...resErro   },
        },
      },
    },
    '/carros/pessoa/{pessoaId}': {
      get: {
        summary: 'Lista todos os carros de uma pessoa específica',
        tags: ['Carros'],
        parameters: [{ in: 'path', name: 'pessoaId', required: true, schema: { type: 'integer' }, description: 'ID da pessoa' }],
        responses: {
          200: { description: 'OK — lista retornada com sucesso',            ...resCarros },
          404: { description: 'Not Found — pessoa não encontrada',           ...resErro   },
          500: { description: 'Internal Server Error — erro no servidor',    ...resErro   },
        },
      },
    },
    '/carros/{id}': {
      get: {
        summary: 'Busca um carro pelo ID',
        tags: ['Carros'],
        parameters: [paramId('ID do carro')],
        responses: {
          200: { description: 'OK — carro encontrado',                       ...resCarro },
          404: { description: 'Not Found — carro não encontrado',            ...resErro  },
          500: { description: 'Internal Server Error — erro no servidor',    ...resErro  },
        },
      },
      put: {
        summary: 'Atualiza os dados de um carro',
        tags: ['Carros'],
        parameters: [paramId('ID do carro')],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CarroInput' } } } },
        responses: {
          200: { description: 'OK — carro atualizado com sucesso',           ...resCarro },
          400: { description: 'Bad Request — dados inválidos ou ausentes',   ...resErro  },
          404: { description: 'Not Found — carro não encontrado',            ...resErro  },
          409: { description: 'Conflict — placa já cadastrada em outro carro',...resErro },
          500: { description: 'Internal Server Error — erro no servidor',    ...resErro  },
        },
      },
      delete: {
        summary: 'Remove um carro pelo ID',
        tags: ['Carros'],
        parameters: [paramId('ID do carro')],
        responses: {
          204: { description: 'No Content — carro removido com sucesso' },
          404: { description: 'Not Found — carro não encontrado',            ...resErro },
          500: { description: 'Internal Server Error — erro no servidor',    ...resErro },
        },
      },
    },
  },
};
