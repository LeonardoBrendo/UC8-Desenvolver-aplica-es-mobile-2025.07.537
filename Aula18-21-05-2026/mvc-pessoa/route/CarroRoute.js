const { Router } = require('express');
const CarroController = require('../controller/CarroController');
const autenticar      = require('../middleware/authMiddleware');
const validate        = require('../middleware/validate');
const { carroCriarSchema, carroAtualizarSchema } = require('../validation/carroSchema');

const router     = Router();
const controller = new CarroController();

// Todas as rotas abaixo exigem token JWT válido
router.use(autenticar);

// Rota mais específica antes da genérica /:id
router.get('/pessoa/:pessoaId', (req, res, next) => controller.buscarPorPessoa(req, res, next));

router.get('/',     (req, res, next) => controller.listarTodos(req, res, next));
router.get('/:id',  (req, res, next) => controller.buscarPorId(req, res, next));

router.post('/',    validate(carroCriarSchema),    (req, res, next) => controller.criar(req, res, next));
router.put('/:id',  validate(carroAtualizarSchema),(req, res, next) => controller.atualizar(req, res, next));
router.delete('/:id',                              (req, res, next) => controller.deletar(req, res, next));

module.exports = router;
