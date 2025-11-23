// routes/index.js
// importação
var express = require('express');
var router = express.Router();

// importar o controoler
const receitasController = require('../controller/receitasController');

/* GET home page. */
// Direcionar para a função 'index' do Controller
router.get('/', receitasController.index);

// GET sobre page. 
router.get('/sobre', receitasController.sobre);

// GET nova receita page.
router.get('/receitas/nova', receitasController.novaReceitaForm);

/* POST nova receita - (processa o formulário) */
router.post('/receitas/nova', receitasController.criarReceita);

/* GET Detalhe da Receita (Consulta por ID) */
router.get('/receitas/:id', receitasController.detalheReceita);

// POST Exclusão de Receita 
router.post('/receitas/:id/excluir', receitasController.excluirReceita);

/* GET Alteração de Receita (Formulário preenchido) */
router.get('/receitas/:id/alterar', receitasController.alterarReceitaForm);

module.exports = router;
