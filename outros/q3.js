const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log('Requisição do tipo GET recebida na rota /');
  res.json({
    message: 'Seja bem-vindo à API de usuários!',
    endpoint: ['GET /', 'POST /usuarios'],
    versao: '1.0'
  });
});

app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
  }

  console.log(`Usuário recebido: ${nome}`);

  const usuario = {
    id: Math.floor(Math.random() * 1000),
    nome: nome,
    email: email,
    criadoEm: new Date()
  };

  res.status(201).json({
    message: `Usuário ${nome} cadastrado com sucesso!`,
    usuario
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('Acesse http://localhost:3001 para ver a mensagem de boas-vindas.');
});