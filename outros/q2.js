const fs = require('fs');

fs.writeFile('mensagem.txt', 'O João ama o Jr. Ele é o melhor amigo do João e eles se divertem muito juntos!', (err) => {
    if (err) {
        console.error('Erro ao escrever no arquivo:', err);
        return false;
    } 
    if (fs.existsSync('mensagem2.txt')) {
        console.error('Erro ao criar o arquivo:', err);
        return false;
    }

    console.log('Arquivo criado com sucesso!');

    fs.readFile('mensagem.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return false;
        }   
        console.log('Conteúdo do arquivo:', data);
    });
});