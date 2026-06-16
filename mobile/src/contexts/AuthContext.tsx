/**
 * AuthContext — guarda o token de quem está logado e expõe funções
 * para entrar/sair. Qualquer componente dentro de <AuthProvider> pode
 * ler esse estado com o hook useAuth(), sem precisar passar token via props.
 *
 * Obs: o token fica apenas em memória (useState). Ao fechar o app,
 * o usuário precisa logar novamente — isso é proposital para manter
 * o exemplo simples (persistência com AsyncStorage seria o próximo passo).
 */

import { createContext, ReactNode, useContext, useState } from 'react';
import { login as loginRequest } from '../services/authService';

type AuthContextData = {
  token: string | null;
  entrar: (email: string, senha: string) => Promise<void>;
  sair: () => void;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  async function entrar(email: string, senha: string) {
    const resposta = await loginRequest(email, senha);
    setToken(resposta.token);
  }

  function sair() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook usado pelas telas para ler o token e chamar entrar()/sair().
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um <AuthProvider>');
  }

  return context;
}
