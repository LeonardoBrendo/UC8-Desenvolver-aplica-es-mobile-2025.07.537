/**
 * Tipos compartilhados entre telas, componentes e services.
 * Mantê-los aqui evita repetir a mesma "forma" de objeto em vários arquivos.
 */

// Dono do carro (vem populado pelo backend via include do Sequelize).
export type Pessoa = {
  id: number;
  nome: string;
  email: string;
};

// Formato de um carro retornado pela API.
export type Carro = {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  placa: string;
  pessoaId: number;
  pessoa?: Pessoa;
};

// Resposta de GET /carros — paginada.
export type CarrosResponse = {
  total: number;
  page: number;
  limit: number;
  data: Carro[];
};

// Resposta de POST /auth/login.
export type LoginResponse = {
  token: string;
  refreshToken: string;
};

// Corpo enviado para POST /auth/registro.
export type RegistroPayload = {
  nome: string;
  email: string;
  senha: string;
  idade: number;
  altura: number;
  profissao?: string;
  cidade?: string;
};

