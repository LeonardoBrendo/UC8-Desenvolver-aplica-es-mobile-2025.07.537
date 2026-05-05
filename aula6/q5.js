const axios = require('axios');

async function buscarUsuarios(){
    console.log('Buscando usuários na API...');
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const usuarios = response.data[1];
        console.log(usuarios);
        console.log('Usuários encontrados:');
        usuarios.slice(0,10).forEach(usuario => {
            console.log(`ID: ${usuario.id}, Nome: ${usuario.name}, Email: ${usuario.email}`);
        });
        console.log('Busca concluída!!!');
    }catch (error) {        
        console.error('Erro ao buscar usuários:', error.message);
    }
}

buscarUsuarios();