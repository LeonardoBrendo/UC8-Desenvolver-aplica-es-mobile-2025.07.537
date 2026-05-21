const paramId      = (desc) => ({ in: 'path', name: 'id',       required: true, schema: { type: 'integer' }, description: desc });
const paramPage    = { in: 'query', name: 'page',  schema: { type: 'integer', default: 1  }, description: 'Número da página' };
const paramLimit   = { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 }, description: 'Itens por página' };
const seguro       = [{ BearerAuth: [] }];

const resErro    = { content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro'          } } } };
const resPessoa  = { content: { 'application/json': { schema: { $ref: '#/components/schemas/Pessoa'        } } } };
const resCarro   = { content: { 'application/json': { schema: { $ref: '#/components/schemas/Carro'         } } } };
const resPessoas = { content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginaPessoas' } } } };
const resCarros  = { content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginaCarros'  } } } };

module.exports = {
  openapi: '3.0.0',
  info: {
    title:       'API Pessoa + Carro',
    version:     '3.0.0',
    description: 'CRUD de Pessoa e Carro com autenticação JWT, validação Joi, paginação e boas práticas de segurança.',
  },
  servers: [{ url: 'http://localhost:3000' }],

  tags: [
    { name: 'Auth',    description: 'Registro, login e renovação de token (públicos)'        },
    { name: 'Pessoas', description: 'CRUD de Pessoa — requer Bearer Token'                   },
    { name: 'Carros',  description: 'CRUD de Carro vinculado a Pessoa — requer Bearer Token' },
  ],

  security: [],

  components: {
    securitySchemes: {
      BearerAuth: {
        type:         'http',
        scheme:       'bearer',
        bearerFormat: 'JWT',
        description:  'Cole o token retornado pelo POST /auth/login (sem o prefixo "Bearer")',
      },
    },
    schemas: {
      // ── Pessoa ────────────────────────────────────────────────
      Pessoa: {
        type: 'object',
        properties: {
          id:        { type: 'integer', example: 1 },
          nome:      { type: 'string',  example: 'Maria Silva' },
          email:     { type: 'string',  format: 'email', example: 'maria@email.com' },
          idade:     { type: 'integer', example: 30 },
          altura:    { type: 'number',  format: 'float', example: 1.68 },
          profissao: { type: 'string',  example: 'Engenheira' },
          cidade:    { type: 'string',  example: 'São Paulo' },
        },
      },
      PessoaCriar: {
        type: 'object',
        required: ['nome', 'email', 'senha', 'idade', 'altura'],
        properties: {
          nome:      { type: 'string',  example: 'Maria Silva' },
          email:     { type: 'string',  format: 'email', example: 'maria@email.com' },
          senha:     { type: 'string',  example: 'senha123', minLength: 6 },
          idade:     { type: 'integer', example: 30 },
          altura:    { type: 'number',  format: 'float', example: 1.68 },
          profissao: { type: 'string',  example: 'Engenheira' },
          cidade:    { type: 'string',  example: 'São Paulo' },
        },
      },
      PessoaAtualizar: {
        type: 'object',
        required: ['nome', 'idade', 'altura'],
        properties: {
          nome:      { type: 'string',  example: 'Maria Silva' },
          email:     { type: 'string',  format: 'email', example: 'maria@email.com' },
          senha:     { type: 'string',  example: 'novasenha123', minLength: 6 },
          idade:     { type: 'integer', example: 30 },
          altura:    { type: 'number',  format: 'float', example: 1.68 },
          profissao: { type: 'string',  example: 'Engenheira' },
          cidade:    { type: 'string',  example: 'São Paulo' },
        },
      },
      PaginaPessoas: {
        type: 'object',
        properties: {
          total: { type: 'integer', example: 42 },
          page:  { type: 'integer', example: 1  },
          limit: { type: 'integer', example: 10 },
          data:  { type: 'array',   items: { $ref: '#/components/schemas/Pessoa' } },
        },
      },
      // ── Carro ─────────────────────────────────────────────────
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
      CarroCriar: {
        type: 'object',
        required: ['marca', 'modelo', 'pessoaId'],
        properties: {
          marca:    { type: 'string',  example: 'Toyota' },
          modelo:   { type: 'string',  example: 'Corolla' },
          pessoaId: { type: 'integer', example: 1 },
          ano:      { type: 'integer', example: 2022 },
          cor:      { type: 'string',  example: 'Prata' },
          placa:    { type: 'string',  example: 'ABC-1234' },
        },
      },
      CarroAtualizar: {
        type: 'object',
        required: ['marca', 'modelo'],
        properties: {
          marca:    { type: 'string',  example: 'Toyota' },
          modelo:   { type: 'string',  example: 'Corolla' },
          pessoaId: { type: 'integer', example: 1 },
          ano:      { type: 'integer', example: 2023 },
          cor:      { type: 'string',  example: 'Preto' },
          placa:    { type: 'string',  example: 'XYZ-9999' },
        },
      },
      PaginaCarros: {
        type: 'object',
        properties: {
          total: { type: 'integer', example: 15 },
          page:  { type: 'integer', example: 1  },
          limit: { type: 'integer', example: 10 },
          data:  { type: 'array',   items: { $ref: '#/components/schemas/Carro' } },
        },
      },
      // ── Auth ──────────────────────────────────────────────────
      RegistroInput: {
        type: 'object',
        required: ['nome', 'email', 'senha', 'idade', 'altura'],
        properties: {
          nome:      { type: 'string',  example: 'João Souza' },
          email:     { type: 'string',  format: 'email', example: 'joao@email.com' },
          senha:     { type: 'string',  example: 'senha123', minLength: 6 },
          idade:     { type: 'integer', example: 28 },
          altura:    { type: 'number',  format: 'float', example: 1.75 },
          profissao: { type: 'string',  example: 'Desenvolvedor' },
          cidade:    { type: 'string',  example: 'Curitiba' },
        },
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'senha'],
        properties: {
          email: { type: 'string', format: 'email', example: 'joao@email.com' },
          senha: { type: 'string', example: 'senha123' },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          token:        { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        },
      },
      RefreshInput: {
        type: 'object',
        required: ['refreshToken'],
        properties: {
          refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        },
      },
      RefreshResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        },
      },
      Erro: {
        type: 'object',
        properties: { erro: { type: 'string', example: 'Mensagem de erro' } },
      },
    },
  },

  paths: {
    // ─── Auth ────────────────────────────────────────────────────────────────
    '/auth/registro': {
      post: {
        summary: 'Cria uma nova conta de usuário',
        tags: ['Auth'],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/RegistroInput' } } } },
        responses: {
          201: { description: 'Conta criada com sucesso',                       ...resPessoa },
          400: { description: 'Dados inválidos ou ausentes',                    ...resErro   },
          409: { description: 'Email já cadastrado',                            ...resErro   },
          500: { description: 'Erro interno do servidor',                       ...resErro   },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Realiza login e retorna access token + refresh token',
        tags: ['Auth'],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginInput' } } } },
        responses: {
          200: { description: 'Login bem-sucedido',                             content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } } },
          400: { description: 'Email ou senha ausentes',                        ...resErro   },
          401: { description: 'Credenciais inválidas',                          ...resErro   },
          429: { description: 'Muitas tentativas — aguarde 15 minutos',         ...resErro   },
          500: { description: 'Erro interno do servidor',                       ...resErro   },
        },
      },
    },
    '/auth/refresh': {
      post: {
        summary: 'Renova o access token usando o refresh token',
        tags: ['Auth'],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/RefreshInput' } } } },
        responses: {
          200: { description: 'Novo access token gerado',                       content: { 'application/json': { schema: { $ref: '#/components/schemas/RefreshResponse' } } } },
          400: { description: 'refreshToken ausente',                           ...resErro },
          401: { description: 'Refresh token inválido ou expirado',             ...resErro },
          500: { description: 'Erro interno do servidor',                       ...resErro },
        },
      },
    },

    // ─── Pessoas ─────────────────────────────────────────────────────────────
    '/pessoas': {
      get: {
        summary: 'Lista pessoas com paginação',
        tags: ['Pessoas'],
        security: seguro,
        parameters: [paramPage, paramLimit],
        responses: {
          200: { description: 'Lista paginada de pessoas',                      ...resPessoas },
          401: { description: 'Token ausente ou inválido',                      ...resErro    },
          500: { description: 'Erro interno do servidor',                       ...resErro    },
        },
      },
      post: {
        summary: 'Cria uma nova pessoa',
        tags: ['Pessoas'],
        security: seguro,
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PessoaCriar' } } } },
        responses: {
          201: { description: 'Pessoa criada com sucesso',                      ...resPessoa },
          400: { description: 'Dados inválidos ou ausentes',                    ...resErro   },
          401: { description: 'Token ausente ou inválido',                      ...resErro   },
          409: { description: 'Email já cadastrado',                            ...resErro   },
          500: { description: 'Erro interno do servidor',                       ...resErro   },
        },
      },
    },
    '/pessoas/{id}': {
      get: {
        summary: 'Busca pessoa pelo ID',
        tags: ['Pessoas'],
        security: seguro,
        parameters: [paramId('ID da pessoa')],
        responses: {
          200: { description: 'Pessoa encontrada',                              ...resPessoa },
          401: { description: 'Token ausente ou inválido',                      ...resErro   },
          404: { description: 'Pessoa não encontrada',                          ...resErro   },
          500: { description: 'Erro interno do servidor',                       ...resErro   },
        },
      },
      put: {
        summary: 'Atualiza os dados de uma pessoa',
        tags: ['Pessoas'],
        security: seguro,
        parameters: [paramId('ID da pessoa')],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PessoaAtualizar' } } } },
        responses: {
          200: { description: 'Pessoa atualizada com sucesso',                  ...resPessoa },
          400: { description: 'Dados inválidos ou ausentes',                    ...resErro   },
          401: { description: 'Token ausente ou inválido',                      ...resErro   },
          404: { description: 'Pessoa não encontrada',                          ...resErro   },
          500: { description: 'Erro interno do servidor',                       ...resErro   },
        },
      },
      delete: {
        summary: 'Remove uma pessoa pelo ID',
        tags: ['Pessoas'],
        security: seguro,
        parameters: [paramId('ID da pessoa')],
        responses: {
          204: { description: 'Pessoa removida com sucesso' },
          401: { description: 'Token ausente ou inválido',                      ...resErro },
          404: { description: 'Pessoa não encontrada',                          ...resErro },
          500: { description: 'Erro interno do servidor',                       ...resErro },
        },
      },
    },

    // ─── Carros ──────────────────────────────────────────────────────────────
    '/carros': {
      get: {
        summary: 'Lista carros com paginação (inclui dados da pessoa)',
        tags: ['Carros'],
        security: seguro,
        parameters: [paramPage, paramLimit],
        responses: {
          200: { description: 'Lista paginada de carros',                       ...resCarros },
          401: { description: 'Token ausente ou inválido',                      ...resErro   },
          500: { description: 'Erro interno do servidor',                       ...resErro   },
        },
      },
      post: {
        summary: 'Cria um novo carro vinculado a uma pessoa',
        tags: ['Carros'],
        security: seguro,
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CarroCriar' } } } },
        responses: {
          201: { description: 'Carro criado com sucesso',                       ...resCarro  },
          400: { description: 'Dados inválidos ou ausentes',                    ...resErro   },
          401: { description: 'Token ausente ou inválido',                      ...resErro   },
          404: { description: 'pessoaId não existe',                            ...resErro   },
          409: { description: 'Placa já cadastrada',                            ...resErro   },
          500: { description: 'Erro interno do servidor',                       ...resErro   },
        },
      },
    },
    '/carros/pessoa/{pessoaId}': {
      get: {
        summary: 'Lista carros de uma pessoa específica',
        tags: ['Carros'],
        security: seguro,
        parameters: [{ in: 'path', name: 'pessoaId', required: true, schema: { type: 'integer' }, description: 'ID da pessoa' }],
        responses: {
          200: { description: 'Lista de carros da pessoa',                      ...resCarros },
          401: { description: 'Token ausente ou inválido',                      ...resErro   },
          404: { description: 'Pessoa não encontrada',                          ...resErro   },
          500: { description: 'Erro interno do servidor',                       ...resErro   },
        },
      },
    },
    '/carros/{id}': {
      get: {
        summary: 'Busca carro pelo ID',
        tags: ['Carros'],
        security: seguro,
        parameters: [paramId('ID do carro')],
        responses: {
          200: { description: 'Carro encontrado',                               ...resCarro },
          401: { description: 'Token ausente ou inválido',                      ...resErro  },
          404: { description: 'Carro não encontrado',                           ...resErro  },
          500: { description: 'Erro interno do servidor',                       ...resErro  },
        },
      },
      put: {
        summary: 'Atualiza os dados de um carro',
        tags: ['Carros'],
        security: seguro,
        parameters: [paramId('ID do carro')],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CarroAtualizar' } } } },
        responses: {
          200: { description: 'Carro atualizado com sucesso',                   ...resCarro },
          400: { description: 'Dados inválidos ou ausentes',                    ...resErro  },
          401: { description: 'Token ausente ou inválido',                      ...resErro  },
          404: { description: 'Carro não encontrado',                           ...resErro  },
          409: { description: 'Placa já cadastrada em outro carro',             ...resErro  },
          500: { description: 'Erro interno do servidor',                       ...resErro  },
        },
      },
      delete: {
        summary: 'Remove um carro pelo ID',
        tags: ['Carros'],
        security: seguro,
        parameters: [paramId('ID do carro')],
        responses: {
          204: { description: 'Carro removido com sucesso' },
          401: { description: 'Token ausente ou inválido',                      ...resErro },
          404: { description: 'Carro não encontrado',                           ...resErro },
          500: { description: 'Erro interno do servidor',                       ...resErro },
        },
      },
    },
  },
};
