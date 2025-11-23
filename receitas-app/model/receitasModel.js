// model/receitasModel.js
// importar

// Array para armazenar as receitas (como não estamos usando banco de dados iremos armazenar na variável vetor)
let receitas = [
    {
        id: 1,
        titulo: "Bolo de Chocolate",
        ingredientes: "Farinha, açucar, ovos, chocolate em pó, fermento, leite.",
        modoDePreparo: "Misture os ingredientes secos, adicione os molhados. Leve ao forno por 30 minutos.",
        tempoDePreparo: 30,
    },
    {
        id: 2,
        titulo: "Pão de Queijo",
        ingredientes: "Polvilho doce, queijo ralado, ovos, óleo, leite, sal.",
        modoDePreparo: "Ferva o leite e óleo, escalde o polvilho. Adicione o ovo e o queijo. Asse até dourar.",
        tempoDePreparo: 20,
    }
];

// Variável para controlar o próximo ID
let nextId = receitas.length > 0 ? receitas[receitas.length - 1].id + 1 : 1;

// Função -> acesso aos dados (serve como consulta)
const receitasModel = {
    // Retorna todas as receitas
    getReceitas: () => {
        return receitas;
    },

    // Retorna o ID para a próxima receita
    getnextId: () => {
        return nextId;
    },

    // Adiciona uma nova receita
    addReceita: (novaReceita) => {
        // Gera o novo ID
        novaReceita.id = nextId++;

        // Garante que o tempo de preparo seja um número (pois chega como string pois vem do formulário)
        novaReceita.tempoDePreparo = parseInt(novaReceita.tempoDePreparo);

        // Adiciona a receita à lista
        receitas.push(novaReceita);
    },

    // Nova função: Retorna uma receita pelo seu ID
    getReceitaById: (id) => {
        // ID no array é um número, mas chega como string do Controller (via URL)
        const receitaEncontrada = receitas.find(receita => receita.id === parseInt(id)); 
        return receitaEncontrada;
    },

    // Deleta uma receita pelo ID
    deleteReceita: (id) => {
        const idParaDeletar = parseInt(id);
        
        // Antes de filtrar, verificamos se a receita existe
        const indice = receitas.findIndex(receita => receita.id === idParaDeletar);
        
        if (indice !== -1) {
            // Usa filter para criar um novo array sem a receita do ID especificado
            receitas = receitas.filter(receita => receita.id !== idParaDeletar);
            return true; // Sucesso na exclusão
        }
        return false; // Falha na exclusão (não encontrado)
    },

};

module.exports = receitasModel;