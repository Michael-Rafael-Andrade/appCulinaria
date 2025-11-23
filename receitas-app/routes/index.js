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

module.exports = router;
