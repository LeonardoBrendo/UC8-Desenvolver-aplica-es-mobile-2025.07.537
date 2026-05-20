// ============================================================
// route/CarroRoute.js — define os endpoints de Carro
// ============================================================

const { Router } = require('express');
const CarroController = require('../controller/CarroController');

const router     = Router();
const controller = new CarroController();

// IMPORTANTE: a rota /pessoa/:pessoaId DEVE ser registrada ANTES de /:id.
// Se /:id viesse primeiro, o Express interpretaria a string "pessoa"
// como um id numérico e chamaria buscarPorId em vez de buscarPorPessoa.
// Rotas mais específicas sempre antes das mais genéricas.
router.get('/pessoa/:pessoaId', (req, res) => controller.buscarPorPessoa(req, res));

// GET /carros → lista todos os carros (com dados da pessoa)
router.get('/', (req, res) => controller.listarTodos(req, res));

// GET /carros/:id → busca um carro pelo id
router.get('/:id', (req, res) => controller.buscarPorId(req, res));

// POST /carros → cria um novo carro (pessoaId obrigatório no body)
router.post('/', (req, res) => controller.criar(req, res));

// PUT /carros/:id → atualiza os dados de um carro
router.put('/:id', (req, res) => controller.atualizar(req, res));

// DELETE /carros/:id → remove um carro
router.delete('/:id', (req, res) => controller.deletar(req, res));

module.exports = router;
