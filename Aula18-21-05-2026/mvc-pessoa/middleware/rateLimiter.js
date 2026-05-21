const rateLimit = require('express-rate-limit');

// Limita o endpoint de login a 10 tentativas por IP a cada 15 minutos.
// Isso dificulta ataques de força bruta (tentar muitas senhas até acertar).
const loginLimiter = rateLimit({
  windowMs:         15 * 60 * 1000, // janela de 15 minutos
  max:              10,              // máximo de 10 requisições por IP na janela
  standardHeaders:  true,           // retorna headers RateLimit-* na resposta
  legacyHeaders:    false,
  message: { erro: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
});

module.exports = { loginLimiter };
