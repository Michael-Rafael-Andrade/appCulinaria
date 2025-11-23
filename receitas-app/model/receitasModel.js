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
};

module.exports = receitasModel;