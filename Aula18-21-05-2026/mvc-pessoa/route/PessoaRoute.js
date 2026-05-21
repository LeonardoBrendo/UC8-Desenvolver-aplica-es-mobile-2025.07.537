const { Router } = require('express');
const PessoaController = require('../controller/PessoaController');
const autenticar       = require('../middleware/authMiddleware');
const validate         = require('../middleware/validate');
const { pessoaCriarSchema, pessoaAtualizarSchema } = require('../validation/pessoaSchema');

const router     = Router();
const controller = new PessoaController();

// Todas as rotas abaixo exigem token JWT válido
router.use(autenticar);

router.get('/',     (req, res, next) => controller.listarTodos(req, res, next));
router.get('/:id',  (req, res, next) => controller.buscarPorId(req, res, next));

router.post('/',    validate(pessoaCriarSchema),    (req, res, next) => controller.criar(req, res, next));
router.put('/:id',  validate(pessoaAtualizarSchema),(req, res, next) => controller.atualizar(req, res, next));
router.delete('/:id',                               (req, res, next) => controller.deletar(req, res, next));

module.exports = router;
