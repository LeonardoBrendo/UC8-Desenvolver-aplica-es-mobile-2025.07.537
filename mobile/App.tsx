/**
 * App.tsx — ponto de entrada do aplicativo.
 *
 * Estrutura do projeto (pasta src/):
 *   - config/     -> endereço da API e paleta de cores (theme)
 *   - types/      -> formatos de dados (Carro, etc.)
 *   - navigation/ -> tipos das telas/rotas (RootStackParamList)
 *   - services/   -> funções que fazem fetch para o backend
 *   - contexts/   -> estado global (aqui, o login/token)
 *   - components/ -> peças reutilizáveis de UI (ex: CarroCard)
 *   - screens/    -> telas completas (Login, Registro, Home)
 *
 * Fluxo de autenticação:
 * O AuthProvider guarda o token de quem está logado. Em <Rotas />,
 * decidimos qual tela mostrar com base nesse token:
 *   - sem token  -> LoginScreen (com link para RegistroScreen)
 *   - com token  -> HomeScreen
 *
 * Quando o login dá certo, o token é definido e o React Navigation troca
 * a tela automaticamente — não é preciso chamar navigation.navigate().
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import type { RootStackParamList } from './src/navigation/types';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegistroScreen } from './src/screens/RegistroScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Rotas() {
  const { token } = useAuth();

  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registro"
            component={RegistroScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <Rotas />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
