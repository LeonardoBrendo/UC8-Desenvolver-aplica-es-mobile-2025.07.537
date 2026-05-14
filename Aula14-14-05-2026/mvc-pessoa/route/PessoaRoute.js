// Importa o Router do Express — ele permite criar um conjunto de rotas separado do app principal
const { Router } = require('express');

// Importa o Controller que será responsável por tratar cada requisição
const PessoaController = require('../controller/PessoaController');

// Cria uma instância do roteador
const router = Router();

// Cria uma instância do controller
const controller = new PessoaController();

// Cada linha abaixo define uma rota HTTP:
// router.MÉTODO(caminho, função que trata a requisição)

// GET /pessoas → lista todas as pessoas
router.get('/', (req, res) => controller.listarTodos(req, res));

// GET /pessoas/:id → busca uma pessoa pelo id (ex: GET /pessoas/1)
router.get('/:id', (req, res) => controller.buscarPorId(req, res));

// POST /pessoas → cria uma nova pessoa (dados vêm no corpo da requisição)
router.post('/', (req, res) => controller.criar(req, res));

// PUT /pessoas/:id → atualiza todos os dados de uma pessoa existente
router.put('/:id', (req, res) => controller.atualizar(req, res));

// DELETE /pessoas/:id → remove uma pessoa pelo id
router.delete('/:id', (req, res) => controller.deletar(req, res));

// Exporta o roteador para ser registrado no app.js
module.exports = router;
