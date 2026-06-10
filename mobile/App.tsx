// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// // NewAppScreen é a "tela de boas-vindas" padrão que o React Native CLI
// // gera em projetos novos (links para documentação, tutorial etc).
// import { NewAppScreen } from '@react-native/new-app-screen';

// // Componentes e hooks vindos do núcleo do React Native:
// // - StatusBar: controla a barra de status do celular (cor do texto/ícones)
// // - StyleSheet: cria objetos de estilo otimizados (parecido com CSS)
// // - useColorScheme: hook que informa se o sistema está em modo claro ou escuro
// // - View: o componente de "container" mais básico (equivalente a uma <div>)
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

// // SafeAreaProvider/useSafeAreaInsets: lidam com as "áreas seguras" da tela,
// // ou seja, espaços que não devem ter conteúdo por causa de notch, câmera
// // frontal, barra de status, gestos do sistema etc.
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// // Componente principal do aplicativo — é ele que é exportado e renderizado
// // quando o app inicia (ver index.js).
// function App() {
//   // useColorScheme() retorna 'dark', 'light' ou null/undefined.
//   // Aqui comparamos com 'dark' para obter um booleano simples.
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     // SafeAreaProvider precisa envolver toda a árvore de componentes para
//     // que o hook useSafeAreaInsets (usado em AppContent) funcione.
//     <SafeAreaProvider>
//       {/* Ajusta a cor do texto/ícones da barra de status conforme o tema:
//           - 'light-content' -> ícones claros (para fundos escuros)
//           - 'dark-content'  -> ícones escuros (para fundos claros) */}
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

//       {/* Componente filho que realmente desenha o conteúdo da tela */}
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// // Componente separado apenas para poder usar o hook useSafeAreaInsets,
// // que só funciona dentro de um <SafeAreaProvider> (por isso não é chamado
// // diretamente dentro de App).
// function AppContent() {
//   // Retorna um objeto com as distâncias seguras em cada borda da tela:
//   // { top, bottom, left, right }
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     // View ocupando toda a tela (flex: 1, definido em "styles" abaixo)
//     <View style={styles.container}>
//       {/* Renderiza a tela de boas-vindas padrão do React Native,
//           repassando as informações de área segura para que ela
//           ajuste seu próprio layout corretamente. */}
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// // StyleSheet.create gera estilos otimizados (parecido com CSS-in-JS).
// const styles = StyleSheet.create({
//   container: {
//     // flex: 1 faz o componente ocupar todo o espaço disponível do pai —
//     // neste caso, a tela inteira do dispositivo.
//     flex: 1,
//   },
// });

// // Exporta o componente App como padrão, para ser usado no ponto de entrada
// // do aplicativo (geralmente registrado em index.js via AppRegistry).
// export default App;

//###############################################################

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// // Componentes e hooks vindos do núcleo do React Native:
// // - StatusBar: controla a barra de status do celular (cor do texto/ícones)
// // - StyleSheet: cria objetos de estilo otimizados (parecido com CSS)
// // - Text: exibe texto na tela
// // - useColorScheme: hook que informa se o sistema está em modo claro ou escuro
// // - View: o componente de "container" mais básico (equivalente a uma <div>)
// import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

// // SafeAreaProvider/useSafeAreaInsets: lidam com as "áreas seguras" da tela,
// // ou seja, espaços que não devem ter conteúdo por causa de notch, câmera
// // frontal, barra de status, gestos do sistema etc.
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// // Componente principal do aplicativo — é ele que é exportado e renderizado
// // quando o app inicia (ver index.js).
// function App() {
//   // useColorScheme() retorna 'dark', 'light' ou null/undefined.
//   // Aqui comparamos com 'dark' para obter um booleano simples.
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     // SafeAreaProvider precisa envolver toda a árvore de componentes para
//     // que o hook useSafeAreaInsets (usado em AppContent) funcione.
//     <SafeAreaProvider>
//       {/* SafeAreaProvider envolve a árvore de componentes para lidar com
//           as áreas seguras da tela (notch, barra de status, gestos etc.).
//           Ajusta a cor do texto/ícones da barra de status conforme o tema:
//           - 'light-content' -> ícones claros (para fundos escuros)
//           - 'dark-content'  -> ícones escuros (para fundos claros) */}
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

//       {/* Componente filho que realmente desenha o conteúdo da tela */}
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// // Componente que desenha o conteúdo da tela.
// function AppContent() {
//   return (
//     // View ocupando toda a tela (flex: 1, definido em "styles" abaixo)
//     <View style={styles.container}>
//       {/* Texto simples exibido no centro da tela */}
//       <Text style={styles.helloText}>Hello World</Text>
//     </View>
//   );
// }

// // StyleSheet.create gera estilos otimizados (parecido com CSS-in-JS).
// const styles = StyleSheet.create({
//   container: {
//     // flex: 1 faz o componente ocupar todo o espaço disponível do pai —
//     // neste caso, a tela inteira do dispositivo.
//     flex: 1,
//     // Centraliza o conteúdo horizontal e verticalmente.
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   helloText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
// });

// // Exporta o componente App como padrão, para ser usado no ponto de entrada
// // do aplicativo (geralmente registrado em index.js via AppRegistry).
// export default App;

//###############################################################

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// // Componentes e hooks vindos do núcleo do React Native:
// // - StatusBar: controla a barra de status do celular (cor do texto/ícones)
// // - StyleSheet: cria objetos de estilo otimizados (parecido com CSS)
// // - Text: exibe texto na tela
// // - TextInput: campo de entrada de texto
// // - TouchableOpacity: área clicável com efeito de opacidade ao tocar
// // - useColorScheme: hook que informa se o sistema está em modo claro ou escuro
// // - useState: hook que guarda valores que podem mudar (estado do componente)
// // - View: o componente de "container" mais básico (equivalente a uma <div>)
// import { useState } from 'react';
// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   useColorScheme,
//   View,
// } from 'react-native';

// // SafeAreaProvider/useSafeAreaInsets: lidam com as "áreas seguras" da tela,
// // ou seja, espaços que não devem ter conteúdo por causa de notch, câmera
// // frontal, barra de status, gestos do sistema etc.
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// // Componente principal do aplicativo — é ele que é exportado e renderizado
// // quando o app inicia (ver index.js).
// function App() {
//   // useColorScheme() retorna 'dark', 'light' ou null/undefined.
//   // Aqui comparamos com 'dark' para obter um booleano simples.
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     // SafeAreaProvider precisa envolver toda a árvore de componentes para
//     // que o hook useSafeAreaInsets (usado em AppContent) funcione.
//     <SafeAreaProvider>
//       {/* SafeAreaProvider envolve a árvore de componentes para lidar com
//           as áreas seguras da tela (notch, barra de status, gestos etc.).
//           Ajusta a cor do texto/ícones da barra de status conforme o tema:
//           - 'light-content' -> ícones claros (para fundos escuros)
//           - 'dark-content'  -> ícones escuros (para fundos claros) */}
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

//       {/* Componente filho que realmente desenha o conteúdo da tela */}
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// // Componente que desenha o conteúdo da tela (calculadora simples).
// function AppContent() {
//   // Estados que guardam os números digitados pelo usuário.
//   const [numeroA, setNumeroA] = useState('');
//   const [numeroB, setNumeroB] = useState('');

//   // Estado que guarda o resultado exibido na tela ('' = nenhum resultado ainda).
//   const [resultado, setResultado] = useState('');

//   // Converte os textos digitados em números e aplica a operação escolhida.
//   function calcular(operacao: '+' | '-' | '*' | '/') {
//     const a = Number(numeroA);
//     const b = Number(numeroB);

//     let valor: number;
//     switch (operacao) {
//       case '+':
//         valor = a + b;
//         break;
//       case '-':
//         valor = a - b;
//         break;
//       case '*':
//         valor = a * b;
//         break;
//       case '/':
//         valor = a / b;
//         break;
//     }

//     setResultado(String(valor));
//   }

//   return (
//     // View ocupando toda a tela (flex: 1, definido em "styles" abaixo)
//     <View style={styles.container}>
//       <Text style={styles.title}>Calculadora</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Primeiro número"
//         keyboardType="numeric"
//         value={numeroA}
//         onChangeText={setNumeroA}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Segundo número"
//         keyboardType="numeric"
//         value={numeroB}
//         onChangeText={setNumeroB}
//       />

//       {/* Linha com os botões de operação */}
//       <View style={styles.operationsRow}>
//         <TouchableOpacity style={styles.operationButton} onPress={() => calcular('+')}>
//           <Text style={styles.buttonText}>+</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.operationButton} onPress={() => calcular('-')}>
//           <Text style={styles.buttonText}>-</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.operationButton} onPress={() => calcular('*')}>
//           <Text style={styles.buttonText}>×</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.operationButton} onPress={() => calcular('/')}>
//           <Text style={styles.buttonText}>÷</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Resultado da operação */}
//       {resultado !== '' && (
//         <Text style={styles.resultText}>Resultado: {resultado}</Text>
//       )}
//     </View>
//   );
// }

// // StyleSheet.create gera estilos otimizados (parecido com CSS-in-JS).
// const styles = StyleSheet.create({
//   container: {
//     // flex: 1 faz o componente ocupar todo o espaço disponível do pai —
//     // neste caso, a tela inteira do dispositivo.
//     flex: 1,
//     // Centraliza o conteúdo horizontal e verticalmente.
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 24,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 24,
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   operationsRow: {
//     flexDirection: 'row',
//     width: '100%',
//     justifyContent: 'space-between',
//   },
//   operationButton: {
//     flex: 1,
//     marginHorizontal: 4,
//     backgroundColor: '#1e88e5',
//     borderRadius: 8,
//     paddingVertical: 14,
//     alignItems: 'center',
//   },
//   resultText: {
//     marginTop: 24,
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// // Exporta o componente App como padrão, para ser usado no ponto de entrada
// // do aplicativo (geralmente registrado em index.js via AppRegistry).
// export default App;

//###############################################################
// /**
//  * Exemplo: Lista de Tarefas (To-Do List)
//  *
//  * Objetivo da aula:
//  * - Sair de "um único estado" (como na calculadora) e trabalhar com
//  *   uma COLEÇÃO de dados (array de objetos) guardada em useState.
//  * - Renderizar listas dinâmicas com FlatList.
//  * - Adicionar e remover itens atualizando o estado de forma imutável
//  *   (sem alterar o array original, sempre criando um novo).
//  *
//  * @format
//  */

// import { useState } from 'react';
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// // Formato de cada tarefa guardada na lista.
// type Tarefa = {
//   id: string;
//   texto: string;
// };

// function App() {
//   return (
//     <SafeAreaProvider>
//       <ListaDeTarefas />
//     </SafeAreaProvider>
//   );
// }

// function ListaDeTarefas() {
//   // Texto que está sendo digitado no campo de entrada.
//   const [novaTarefa, setNovaTarefa] = useState('');

//   // Lista de tarefas já adicionadas (array de objetos).
//   const [tarefas, setTarefas] = useState<Tarefa[]>([]);

//   // Adiciona a tarefa digitada ao final da lista.
//   function adicionarTarefa() {
//     // Ignora textos vazios (ou só com espaços).
//     if (novaTarefa.trim() === '') {
//       return;
//     }

//     const tarefa: Tarefa = {
//       id: Date.now().toString(), // id simples baseado no horário atual
//       texto: novaTarefa.trim(),
//     };

//     // Importante: criamos um NOVO array (com spread "...tarefas") em vez
//     // de modificar o array antigo — é assim que o React percebe a mudança.
//     setTarefas([...tarefas, tarefa]);
//     setNovaTarefa('');
//   }

//   // Remove a tarefa cujo id foi informado, filtrando o array.
//   function removerTarefa(id: string) {
//     setTarefas(tarefas.filter(item => item.id !== id));
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Lista de Tarefas</Text>

//       {/* Campo + botão para adicionar uma nova tarefa */}
//       <View style={styles.formRow}>
//         <TextInput
//           style={styles.input}
//           placeholder="Digite uma tarefa..."
//           value={novaTarefa}
//           onChangeText={setNovaTarefa}
//         />
//         <TouchableOpacity style={styles.addButton} onPress={adicionarTarefa}>
//           <Text style={styles.addButtonText}>+</Text>
//         </TouchableOpacity>
//       </View>

//       {/* FlatList renderiza a lista de forma otimizada (só desenha os
//           itens visíveis na tela, mesmo que a lista seja muito grande) */}
//       <FlatList
//         style={styles.list}
//         data={tarefas}
//         keyExtractor={item => item.id}
//         ListEmptyComponent={
//           <Text style={styles.emptyText}>Nenhuma tarefa adicionada ainda.</Text>
//         }
//         renderItem={({ item }) => (
//           <View style={styles.taskRow}>
//             <Text style={styles.taskText}>{item.texto}</Text>
//             <TouchableOpacity onPress={() => removerTarefa(item.id)}>
//               <Text style={styles.removeText}>Remover</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 24,
//     paddingTop: 48,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   formRow: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     fontSize: 16,
//     marginRight: 8,
//   },
//   addButton: {
//     width: 48,
//     backgroundColor: '#1e88e5',
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   list: {
//     flex: 1,
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 24,
//   },
//   taskRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   taskText: {
//     fontSize: 16,
//     flex: 1,
//     marginRight: 12,
//   },
//   removeText: {
//     color: '#e53935',
//     fontWeight: 'bold',
//   },
// });

// export default App;

//###############################################################
// /**
//  * Exemplo: Consumo de API com fetch
//  *
//  * Objetivo da aula:
//  * - Apresentar o hook useEffect, usado para rodar código quando o
//  *   componente é exibido pela primeira vez (ex: buscar dados de uma API).
//  * - Trabalhar com dados assíncronos: estados de "carregando", "erro"
//  *   e "sucesso", que toda tela que busca dados de fora precisa tratar.
//  * - Reaproveitar o FlatList (visto no exemplo de Lista de Tarefas) para
//  *   renderizar os dados vindos da internet.
//  *
//  * API usada (gratuita, sem necessidade de chave/token):
//  * https://official-joke-api.appspot.com/jokes/ten
//  *
//  * @format
//  */

// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// // Formato de cada piada retornada pela API.
// type Piada = {
//   id: number;
//   setup: string;
//   punchline: string;
// };

// const API_URL = 'https://official-joke-api.appspot.com/jokes/ten';

// function App() {
//   return (
//     <SafeAreaProvider>
//       <ListaDePiadas />
//     </SafeAreaProvider>
//   );
// }

// function ListaDePiadas() {
//   // Lista de piadas vindas da API.
//   const [piadas, setPiadas] = useState<Piada[]>([]);

//   // Indica se a busca ainda está em andamento (mostra um spinner).
//   const [carregando, setCarregando] = useState(true);

//   // Guarda uma mensagem de erro, caso a busca falhe ('' = sem erro).
//   const [erro, setErro] = useState('');

//   // Faz a requisição à API e atualiza os estados conforme o resultado.
//   async function buscarPiadas() {
//     setCarregando(true);
//     setErro('');

//     try {
//       const resposta = await fetch(API_URL);

//       if (!resposta.ok) {
//         throw new Error('Não foi possível carregar as piadas.');
//       }

//       const dados: Piada[] = await resposta.json();
//       setPiadas(dados);
//     } catch (e) {
//       setErro('Ocorreu um erro ao buscar os dados. Tente novamente.');
//     } finally {
//       setCarregando(false);
//     }
//   }

//   // useEffect com array de dependências [] roda a função apenas UMA VEZ,
//   // logo após o componente aparecer na tela — ideal para buscar dados iniciais.
//   useEffect(() => {
//     buscarPiadas();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Piadas (consumo de API)</Text>

//       {/* Estado de carregamento */}
//       {carregando && (
//         <View style={styles.center}>
//           <ActivityIndicator size="large" color="#1e88e5" />
//           <Text style={styles.infoText}>Carregando piadas...</Text>
//         </View>
//       )}

//       {/* Estado de erro, com botão para tentar novamente */}
//       {!carregando && erro !== '' && (
//         <View style={styles.center}>
//           <Text style={styles.errorText}>{erro}</Text>
//           <TouchableOpacity style={styles.button} onPress={buscarPiadas}>
//             <Text style={styles.buttonText}>Tentar novamente</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Estado de sucesso: lista de piadas */}
//       {!carregando && erro === '' && (
//         <FlatList
//           data={piadas}
//           keyExtractor={item => String(item.id)}
//           renderItem={({ item }) => (
//             <View style={styles.card}>
//               <Text style={styles.setupText}>{item.setup}</Text>
//               <Text style={styles.punchlineText}>{item.punchline}</Text>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 24,
//     paddingTop: 48,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   center: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   infoText: {
//     marginTop: 12,
//     color: '#888',
//   },
//   errorText: {
//     color: '#e53935',
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: '#1e88e5',
//     borderRadius: 8,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   card: {
//     borderWidth: 1,
//     borderColor: '#eee',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 12,
//   },
//   setupText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   punchlineText: {
//     fontSize: 16,
//     color: '#444',
//   },
// });

// export default App;
