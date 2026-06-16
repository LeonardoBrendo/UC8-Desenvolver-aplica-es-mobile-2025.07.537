/**
 * CarroCard — mostra os dados de um carro em formato de "cartão".
 * Recebe o carro via props e só se preocupa em exibir, sem buscar dados.
 */

import { StyleSheet, Text, View } from 'react-native';
import { Carro } from '../types';

type Props = {
  carro: Carro;
};

export function CarroCard({ carro }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.titulo}>
          {carro.marca} {carro.modelo}
        </Text>

        <View style={styles.placaBadge}>
          <Text style={styles.placaTexto}>{carro.placa}</Text>
        </View>
      </View>

      <Text style={styles.detalhe}>Ano: {carro.ano}</Text>
      <Text style={styles.detalhe}>Cor: {carro.cor}</Text>

      {carro.pessoa && (
        <Text style={styles.dono}>Dono(a): {carro.pessoa.nome}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  placaBadge: {
    backgroundColor: '#1e88e5',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  placaTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  detalhe: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  dono: {
    fontSize: 13,
    color: '#999',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
