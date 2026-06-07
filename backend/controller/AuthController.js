const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const { Pessoa } = require('../model');

class AuthController {

  // POST /auth/registro — cria conta com senha hashada (público)
  async registro(req, res, next) {
    const { nome, email, senha, idade, altura, profissao, cidade } = req.body;
    try {
      const hash   = await bcrypt.hash(senha, 10);
      const pessoa = await Pessoa.create({ nome, email, senha: hash, idade, altura, profissao, cidade });

      // Retorna os dados sem expor a senha
      const { senha: _, ...dados } = pessoa.toJSON();
      res.status(201).json(dados);
    } catch (err) {
      next(err);
    }
  }

  // POST /auth/login — valida credenciais e devolve access + refresh token
  async login(req, res, next) {
    const { email, senha } = req.body;
    try {
      const pessoa = await Pessoa.findOne({ where: { email } });

      if (!pessoa || !(await bcrypt.compare(senha, pessoa.senha))) {
        const err = new Error('Credenciais inválidas');
        err.statusCode = 401;
        return next(err);
      }

      const payload      = { id: pessoa.id, email: pessoa.email };
      const token        = jwt.sign(payload, process.env.JWT_SECRET,         { expiresIn: '5m'  });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '10m' });

      res.status(200).json({ token, refreshToken });
    } catch (err) {
      next(err);
    }
  }

  // POST /auth/refresh — gera novo access token a partir do refresh token
  async refresh(req, res, next) {
    const { refreshToken } = req.body;
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const token   = jwt.sign(
        { id: payload.id, email: payload.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token });
    } catch (err) {
      const error = new Error('Refresh token inválido ou expirado');
      error.statusCode = 401;
      next(error);
    }
  }
}

module.exports = AuthController;
