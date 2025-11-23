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
    },

    // Função para exibir o formulário de criação de nova receita 
    novaReceitaForm: (req, res) => {
        res.render('novaReceita', {
            title: 'Nova Receita',
            isNova: true // ativa o item "Nova receita" no menu
        });
    },

    // Função para lidar com a submissão do formulário (POST - receitas/nova)
    criarReceita: (req, res) => {
        const {
            titulo, 
            ingredientes,
            modoDePreparo,
            tempoDePreparo
        } = req.body;
        let erros = {};
        let valido = true;

        // validação de obrigatoriedade 
        if(!titulo || titulo.trim() === ''){
            erros.titulo = 'O título da receita é obrigatório.';
            valido = false;
        }
        if(!modoDePreparo || modoDePreparo.trim() === ''){
            erros.modoDePreparo = 'O modo de preparo é obrigatório.';
            valido = false;
        }
        // validação de tempo mínimo
        const tempo = parseInt(tempoDePreparo);
        if(isNaN(tempo) || tempo < 1){
            erros.tempoDePreparo = 'O tempo de preparo deve ser um número e ter no mínimo 1 minuto.';
            valido = false;
        }
        if(valido){ // Sim = cria o objeto e adiciona ao modelo
            const novaReceita = {
                titulo,
                ingredientes,
                modoDePreparo,
                tempoDePreparo: tempo // tempo parseado
            };
            receitasModel.addReceita(novaReceita);
            // Redireciona para a página principal 
            res.redirect('/');
        } else { // Sim = renderiza o formulário com a mensagem de erro e os dados submetidos
            res.render('novaReceita', {
                title: 'Nova Receita',
                isNova: true,
                erros: erros, // envia os erros para view
                oldData: req.body // envia os dados antigos também.
            });

        }
    },

    // Função para exibir os detalhes de uma receita específica (GET /receitas/:id)
    detalheReceita: (req, res) => {
        // O ID é capturado dos parâmetros da rota (req.params.id)
        const id = req.params.id; 
        
        // Buscar a receita no Modelo
        const receita = receitasModel.getReceitaById(id); 

        if (receita) {
            // Se encontrar, renderiza a view
            res.render('detalheReceita', { 
                title: receita.titulo,
                receita: receita 
            });
        } else {
            // Se não encontrar, exibe um erro
            res.status(404).render('error', { 
                message: 'Receita não encontrada',
                error: { status: 404, stack: '' } 
            });
        }
    },

    // Função para lidar com a exclusão de receita (POST /receitas/:id/excluir)
    excluirReceita: (req, res) => {
        const id = req.params.id; 
        
        const sucesso = receitasModel.deleteReceita(id); 

        // Adicionar uma lógica de feedback (opcional, mas bom)
        if (sucesso) {
            console.log(`Receita ID ${id} excluída com sucesso.`);
        } else {
            console.log(`Tentativa de excluir receita ID ${id} falhou (não encontrada).`);
        }
        
        // Redireciona sempre para a página inicial
        res.redirect('/');
    },

    // Função para exibir o formulário de alteração de receita (GET /receitas/:id/alterar)
    alterarReceitaForm: (req, res) => {
        const id = req.params.id;
        
        // Busca a receita no Modelo
        const receita = receitasModel.getReceitaById(id);

        if (receita) {
            // Renderiza a View, passando os dados da receita para preenchimento
            res.render('alterarReceita', {
                title: `Alterar: ${receita.titulo}`,
                receita: receita // Passamos o objeto receita para a View
            });
        } else {
            // Se não encontrou, retorna erro 404
            res.status(404).render('error', {
                message: 'Receita não encontrada para alteração.',
                error: { status: 404, stack: '' }
            });
        }
    },

    // Função para salvar as alterações vindas da receita pelo POST
    alterarReceita: (req, res) => {
        const id = req.params.id;
        const { titulo, ingredientes, modoDePreparo, tempoDePreparo } = req.body;
        let erros = {};
        let valido = true;

        // VALIDAÇÃO (Reutiliza a lógica de validação do cadastro) ---
        if (!titulo || titulo.trim() === '') {
            erros.titulo = 'O título é obrigatório.';
            valido = false;
        }
        if (!ingredientes || ingredientes.trim() === '') {
            erros.ingredientes = 'A lista de ingredientes é obrigatória.';
            valido = false;
        }
        if (!modoDePreparo || modoDePreparo.trim() === '') {
            erros.modoDePreparo = 'O modo de preparo é obrigatório.';
            valido = false;
        }
        const tempo = parseInt(tempoDePreparo);
        if (isNaN(tempo) || tempo < 1) {
            erros.tempoDePreparo = 'O tempo de preparo deve ser um número e ter no mínimo 1 minuto.';
            valido = false;
        }

        if (valido) {
            // Se válido:
            const dadosAtualizados = req.body; // Usa req.body diretamente, pois a validação já tratou os tipos
            
            // Chama o Modelo para atualizar
            const sucesso = receitasModel.updateReceita(id, dadosAtualizados);
            
            // Redireciona para os detalhes da receita ou para a Home
            if (sucesso) {
                res.redirect(`/receitas/${id}`); // Redireciona para os detalhes para ver a mudança
            } else {
                // Se a receita não foi encontrada (raro, mas possível)
                 res.status(404).send('Receita não encontrada para atualização.');
            }
            
        } else {
            // Se inválido, re-renderiza o formulário de alteração com os erros e os dados antigos
            // Nota: Passamos o objeto receita com os dados antigos e o ID
            res.render('alterarReceita', {
                title: 'Alterar Receita',
                erros: erros, 
                // Passamos req.body + ID para remontar o objeto receita para preenchimento
                receita: {
                    id: id,
                    ...req.body 
                }
            });
        }
    },

    



};

module.exports = receitasController;