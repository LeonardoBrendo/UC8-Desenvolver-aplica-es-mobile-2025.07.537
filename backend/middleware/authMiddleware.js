// ============================================================
// middleware/authMiddleware.js — valida o token JWT em cada requisição
// ============================================================
//
// O QUE É UM MIDDLEWARE?
// Middleware é uma função que fica "no meio" do caminho entre a
// requisição do cliente e o controller.
// Fluxo normal sem middleware:  Cliente → Route → Controller → Banco
// Fluxo com middleware:         Cliente → Route → Middleware → Controller → Banco
//
// Se o middleware chamar next(), a requisição segue em frente.
// Se ele chamar res.status(...).json(...), a requisição é barrada ali mesmo.
//
// O QUE É JWT?
// JWT (JSON Web Token) é um token gerado pelo servidor no momento do login.
// Ele contém dados do usuário (id, email) e uma assinatura digital.
// A assinatura é feita com uma chave secreta (JWT_SECRET), então só o
// servidor consegue gerar e verificar tokens válidos.
//
// FORMATO DO TOKEN NO HEADER HTTP:
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
// "Bearer" é o tipo do esquema de autenticação (padrão da indústria).

const jwt = require('jsonwebtoken');

// Esta função é o middleware. Express passa (req, res, next) para ela:
//   req  → dados da requisição (headers, body, params…)
//   res  → objeto para montar a resposta HTTP
//   next → função que, quando chamada, libera a requisição para o próximo passo
function autenticar(req, res, next) {

  // Lê o header "Authorization" da requisição
  // Exemplo de valor esperado: "Bearer eyJhbGci..."
  const authHeader = req.headers['authorization'];

  // Verifica se o header foi enviado E se começa com "Bearer "
  // Se não tiver o header ou não seguir o formato, bloqueia com 401 (Não autorizado)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  // O header tem o formato "Bearer <token>"
  // split(' ') divide a string em duas partes: ['Bearer', '<token>']
  // [1] pega a segunda parte, que é o token em si
  const token = authHeader.split(' ')[1];

  try {
    // jwt.verify() faz duas coisas ao mesmo tempo:
    //   1. Decodifica o token e extrai o payload (os dados que foram embutidos no login)
    //   2. Verifica a assinatura usando JWT_SECRET — garante que o token não foi falsificado
    // Se o token for inválido ou estiver expirado, lança uma exceção (vai pro catch)
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Armazena o id do usuário logado dentro do objeto req
    // Assim, qualquer controller que vier depois pode acessar req.pessoaId
    // e saber quem está fazendo a requisição
    req.pessoaId = payload.id;

    // Tudo certo! Libera a requisição para o próximo passo (o controller)
    next();

  } catch (err) {
    // jwt.verify() lançou erro → token inválido, expirado ou adulterado
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}

module.exports = autenticar;
