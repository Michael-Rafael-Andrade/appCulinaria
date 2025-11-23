// controller/receitasController.js
// importar

const receitasModel = require('../model/receitasModel');

const receitasController = {
    // Função para renderizar a página principal (mostrar receitas)
    index: (req, res) => {
        // acessará os dados através do modelo
        const listaReceitas = receitasModel.getReceitas();

        // servirá para renderizar ou gerar a imagem na tela - View(index.hbs), passando os dados
        res.render('index', {
            title: 'Sistema de Receitas',
            receitas: listaReceitas,
        });
    },

};

module.exports = receitasController;