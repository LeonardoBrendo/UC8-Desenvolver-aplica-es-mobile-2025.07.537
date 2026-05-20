// ============================================================
// route/PessoaRoute.js — define os endpoints de Pessoa
// ============================================================
// A camada Route conecta uma URL + método HTTP ao método
// correto do Controller. Não contém lógica de negócio.
//
// Padrão de registro:
//   router.MÉTODO(caminho, (req, res) => controller.método(req, res))
//
// A arrow function é necessária para preservar o 'this' do Controller.
// Sem ela (ex: router.get('/', controller.listarTodos))
// o 'this' dentro do método seria undefined.

const { Router } = require('express');
const PessoaController = require('../controller/PessoaController');

const router     = Router();
const controller = new PessoaController();

// GET /pessoas → lista todas as pessoas
router.get('/', (req, res) => controller.listarTodos(req, res));

// GET /pessoas/:id → busca uma pessoa pelo id
// :id é um parâmetro dinâmico acessível via req.params.id
router.get('/:id', (req, res) => controller.buscarPorId(req, res));

// POST /pessoas → cria uma nova pessoa (dados no corpo da requisição)
router.post('/', (req, res) => controller.criar(req, res));

// PUT /pessoas/:id → atualiza todos os dados de uma pessoa existente
router.put('/:id', (req, res) => controller.atualizar(req, res));

// DELETE /pessoas/:id → remove uma pessoa pelo id
router.delete('/:id', (req, res) => controller.deletar(req, res));

module.exports = router;
