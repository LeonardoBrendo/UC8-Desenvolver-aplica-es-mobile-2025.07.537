/**
 * Service de autenticação — sabe conversar com o endpoint /auth.
 * Telas e contexts não fazem fetch diretamente, eles chamam essas funções.
 */

import { API_URL } from '../config/api';
import { LoginResponse, RegistroPayload } from '../types';

// POST /auth/login — envia email/senha e recebe { token, refreshToken }.
export async function login(email: string, senha: string): Promise<LoginResponse> {
  const resposta = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    // O backend responde erros no formato { erro: 'mensagem' }
    throw new Error(dados.erro || 'Não foi possível fazer login.');
  }

  return dados;
}

// POST /auth/registro — rota pública, cria a pessoa com senha já hasheada.
export async function registrar(dados: RegistroPayload): Promise<void> {
  const resposta = await fetch(`${API_URL}/auth/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.erro || 'Não foi possível concluir o cadastro.');
  }
}
