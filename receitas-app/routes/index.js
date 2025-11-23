// routes/index.js
// importação
var express = require('express');
var router = express.Router();

// importar o controoler
const receitasController = require('../controller/receitasController');

/* GET home page. */
// Direcionar para a função 'index' do Controller
router.get('/', receitasController.index);



module.exports = router;
