const express = require('express')
const router = express.Router() //modulo que ira trabalhar com as rotas

const planta = require('../models/planta')
const colheita = require('../models/colheita')
const {where} = require('sequelize')

//criando rotas
//1ª rota inserir dados na tabela

router.post('/inserir', async (req, res) => {
    try {
        const resultado = await colheita.create({
            data_colheita: req.body.data_colheita,
            quantidade_colhida: req.body.quantidade_colhida,
            plantaId: req.body.plantaId
        });

        if (resultado) {
            res.redirect('/colheita');  // Redireciona para a página de listagem de colheitas
        } else {
            res.json({ erro: "Não foi possível cadastrar" });
        }
    } catch (err) {
        console.log(err);
        res.json({ erro: "Erro ao cadastrar a colheita" });
    }
});


//2ª rota mostrar pagina raiz
router.get('/base', async (req, res) => {
    res.render('colheita/index')
})

//3ª rota - consultar os dados da tabela
router.get('/', async (req, res) => {
        let resultado = await colheita.findAll({include:planta}); // Buscando dados
        if (resultado) {
            console.log(resultado);
            res.render('colheita/index', { dados: resultado }); // Renderizando a view
        } 
        else {
            res.json({ erro: "Não foi possível consultar os dados" });
        }
    
});

//4ª rota - deletar os dados da tabela por id
router.get('/deletar/:id', async (req, res) => {
    const resultado = await colheita.destroy({
        where:{
            id:req.params.id//estamos recebendo o id via parâmetro, que está sendo passado na rota, no caso é o :id que estamos recebendo.
        }
    })
    res.redirect('/colheita')
})

//5ª rota - exibir formulario
router.get("/criar",async(req,res)=>{
    let resultado = await planta.findAll()
    if(resultado){
        console.log(resultado)
        res.render('colheita/addColheita',{dados:resultado})
    }
    else{
        console.log("Não foi possivel exibir os dados")
        res.redirect('/')
    }    
})
module.exports = router