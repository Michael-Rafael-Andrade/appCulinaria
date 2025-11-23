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
            isHome: true // Variável para deixa o item Home active ou ativo no menu
        });
    },

    // Função para a página "sobre"
    sobre: (req, res) => {
        res.render('sobre', {
            title: 'Sobre a Aplicação',
            isSobre: true // Variável para deixar o item 'sobre' ativo no menu
        });
    }

};

module.exports = receitasController;