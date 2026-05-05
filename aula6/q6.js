const EventEmitter = require('events');
class SistemaEventos extends EventEmitter {}
const eventos = new SistemaEventos();
eventos.on('login', (usuario, horario) => {
    // Esse código será executado sempre que o evento "login" for disparado
    console.log(`🔐 EVENTO: Usuário "${usuario}" fez login às ${horario}`);
});
eventos.on('logout', (usuario) => {
    console.log(`🚪 EVENTO: Usuário "${usuario}" saiu do sistema`);
});
eventos.on('erro', (erro) => {
    // console.error é usado para erros (aparece diferente no terminal)
    console.error(`❌ ERRO: ${erro}`);
});
eventos.on('arquivoSalvo', (nomeArquivo, tamanho) => {
    console.log(`💾 EVENTO: Arquivo "${nomeArquivo}" salvo (${tamanho} bytes)`);
});

eventos.emit('login', 'Levi Mansinho', new Date().toLocaleTimeString());
eventos.emit('logout', 'Levi Mansinho');
eventos.emit('erro', 'Erro ao acessar o sistema');
eventos.emit('arquivoSalvo', 'documento.txt', 1024);
