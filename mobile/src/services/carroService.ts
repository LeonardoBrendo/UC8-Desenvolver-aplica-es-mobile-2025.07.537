/**
 * Service de carros — sabe conversar com o endpoint /carros.
 * Toda rota de /carros exige token JWT no header Authorization.
 */

import { API_URL } from '../config/api';
import { CarrosResponse } from '../types';

// GET /carros — lista os carros cadastrados (rota protegida).
export async function listarCarros(token: string): Promise<CarrosResponse> {
  const resposta = await fetch(`${API_URL}/carros`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.erro || 'Não foi possível carregar os carros.');
  }

  return dados;
}
