/**
 * RegistroScreen — formulário de cadastro de uma nova pessoa.
 *
 * Chama POST /auth/registro (rota pública) com os mesmos campos exigidos
 * pelo backend (ver authSchema.js -> registroSchema). Em caso de sucesso,
 * mostra uma mensagem e oferece um botão para voltar ao Login.
 */

import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../config/theme';
import { registrar } from '../services/authService';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Registro'>;

export function RegistroScreen({ navigation }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [idade, setIdade] = useState('');
  const [altura, setAltura] = useState('');
  const [profissao, setProfissao] = useState('');
  const [cidade, setCidade] = useState('');

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  async function handleCadastrar() {
    if (
      nome.trim() === '' ||
      email.trim() === '' ||
      senha.trim() === '' ||
      idade.trim() === '' ||
      altura.trim() === ''
    ) {
      setErro('Preencha nome, email, senha, idade e altura.');
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      await registrar({
        nome: nome.trim(),
        email: email.trim(),
        senha,
        idade: parseInt(idade, 10),
        altura: Number(altura.replace(',', '.')),
        profissao: profissao.trim() || undefined,
        cidade: cidade.trim() || undefined,
      });

      setSucesso(true);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao cadastrar.');
    } finally {
      setCarregando(false);
    }
  }

  if (sucesso) {
    return (
      <View style={styles.container}>
        <View style={styles.successBox}>
          <Text style={styles.successEmoji}>✅</Text>
          <Text style={styles.successTitle}>Cadastro realizado!</Text>
          <Text style={styles.successText}>
            Sua conta foi criada com sucesso. Agora você já pode entrar com
            seu email e senha.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Ir para o login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltarTexto}>{'← Voltar'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Criar conta</Text>
        <Text style={styles.headerSubtitle}>
          Preencha seus dados para começar
        </Text>
      </View>

      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.formContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome completo"
          placeholderTextColor={colors.textoClaro}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seuemail@exemplo.com"
          placeholderTextColor={colors.textoClaro}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          placeholderTextColor={colors.textoClaro}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Idade</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 25"
              placeholderTextColor={colors.textoClaro}
              keyboardType="numeric"
              value={idade}
              onChangeText={setIdade}
            />
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.label}>Altura (m)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 1.75"
              placeholderTextColor={colors.textoClaro}
              keyboardType="decimal-pad"
              value={altura}
              onChangeText={setAltura}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Profissão (opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Estudante"
              placeholderTextColor={colors.textoClaro}
              value={profissao}
              onChangeText={setProfissao}
            />
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.label}>Cidade (opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Curitiba"
              placeholderTextColor={colors.textoClaro}
              value={cidade}
              onChangeText={setCidade}
            />
          </View>
        </View>

        {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

        <TouchableOpacity
          style={[styles.button, carregando && styles.buttonDisabled]}
          onPress={handleCadastrar}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color={colors.branco} />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.linkTexto}>
            Já tem conta? <Text style={styles.linkDestaque}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  header: {
    backgroundColor: colors.azulEscuro,
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  voltarTexto: {
    color: colors.laranja,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  headerTitle: {
    color: colors.branco,
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: colors.textoClaro,
    fontSize: 14,
    marginTop: 4,
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: 24,
    paddingBottom: 40,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.azulMedio,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: colors.branco,
    color: colors.texto,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowItem: {
    flex: 1,
  },
  erro: {
    color: colors.erro,
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.laranja,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.branco,
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkTexto: {
    fontSize: 14,
    color: colors.azulMedio,
  },
  linkDestaque: {
    color: colors.laranja,
    fontWeight: 'bold',
  },
  successBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  successEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.azulEscuro,
    marginBottom: 8,
    textAlign: 'center',
  },
  successText: {
    fontSize: 15,
    color: colors.azulMedio,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
});
