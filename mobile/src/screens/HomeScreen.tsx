/**
 * HomeScreen — tela exibida após o login.
 *
 * Busca os carros em GET /carros (enviando o token do AuthContext) e
 * trata os 3 estados clássicos de quem consome API: carregando, erro e sucesso.
 */

import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CarroCard } from '../components/CarroCard';
import { useAuth } from '../contexts/AuthContext';
import { listarCarros } from '../services/carroService';
import { Carro } from '../types';

export function HomeScreen() {
  const { token, sair } = useAuth();

  const [carros, setCarros] = useState<Carro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function buscarCarros() {
    if (!token) {
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      const resposta = await listarCarros(token);
      setCarros(resposta.data);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao buscar carros.');
    } finally {
      setCarregando(false);
    }
  }

  // Busca os carros uma única vez, logo que a tela aparece.
  useEffect(() => {
    buscarCarros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Carros cadastrados</Text>
        <TouchableOpacity onPress={sair}>
          <Text style={styles.sairTexto}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Estado de carregamento */}
      {carregando && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1e88e5" />
          <Text style={styles.infoText}>Carregando carros...</Text>
        </View>
      )}

      {/* Estado de erro, com botão para tentar novamente */}
      {!carregando && erro !== '' && (
        <View style={styles.center}>
          <Text style={styles.erroText}>{erro}</Text>
          <TouchableOpacity style={styles.button} onPress={buscarCarros}>
            <Text style={styles.buttonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Estado de sucesso: lista de carros */}
      {!carregando && erro === '' && (
        <FlatList
          data={carros}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.infoText}>Nenhum carro cadastrado.</Text>
          }
          renderItem={({ item }) => <CarroCard carro={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
    paddingHorizontal: 20,
    paddingTop: 56,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  sairTexto: {
    color: '#1e88e5',
    fontWeight: '600',
    fontSize: 14,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    marginTop: 12,
    color: '#888',
    textAlign: 'center',
  },
  erroText: {
    color: '#e53935',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#1e88e5',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 24,
  },
});
