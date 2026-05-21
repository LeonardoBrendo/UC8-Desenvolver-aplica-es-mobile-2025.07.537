const { Router } = require('express');
const AuthController              = require('../controller/AuthController');
const validate                    = require('../middleware/validate');
const { loginLimiter }            = require('../middleware/rateLimiter');
const { loginSchema, registroSchema, refreshSchema } = require('../validation/authSchema');

const router     = Router();
const controller = new AuthController();

// POST /auth/registro — público, cria conta com senha hashada
router.post('/registro', validate(registroSchema), (req, res, next) => controller.registro(req, res, next));

// POST /auth/login — público, com rate limiting (máx 10 tentativas / 15 min)
router.post('/login', loginLimiter, validate(loginSchema), (req, res, next) => controller.login(req, res, next));

// POST /auth/refresh — público, renova o access token via refresh token
router.post('/refresh', validate(refreshSchema), (req, res, next) => controller.refresh(req, res, next));

module.exports = router;
