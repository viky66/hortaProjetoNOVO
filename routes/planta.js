const express = require('express')
const router = express.Router()//modulo  que irá operar com as rotas
const {where} = require('sequelize')
const planta = require('../models/planta')
const colheita = require('../models/colheita')

//criando rotas 
//1ª rota - inserir dados na tabela

router.post('/store', async (req, res) => {
    try {
        const produto = await planta.create({
            nome: req.body.nome,
            data_plantio: req.body.data_plantio,
            tipo: req.body.tipo,
            quantidade: req.body.quantidade,
        });

        console.log("Planta cadastrada:", produto); // Loga o produto inserido
        res.redirect('/planta'); // Redireciona para a página de listagem
    } catch (error) {
        console.error("Erro ao cadastrar planta:", error);
        res.json({ erro: "Não foi possível cadastrar" });
    }
});


//2ª rota - mostrar pagina raiz
router.get('/show',async(req,res)=>{
    res.render('planta/index')
})

// 3ª rota - consultar dados da tabela
router.get('/', async (req, res) => {
    try {
        const plantas = await planta.findAll(); //  busca todas as plantas da tabela planta.
        res.render('planta/index', { dados: plantas }); // envia os dados para a página
    } catch (error) {
        console.error("Erro ao buscar plantas:", error);
        res.render('planta/index', { dados: [] }); // renderiza com lista vazia em caso de erro
    }
});

//4ª rota - deletar dados da tabela por id
router.get('/destroy/:id', async(req,res)=>{
    const produto = await planta.destroy({
        where:{
            id:req.params.id    
        }
    })
    res.redirect('/planta')
})
//5ª - exibir formulario de cadastro
router.get("/create",async(req,res)=>{
    let produto = await planta.findAll()
    if(produto){
        console.log(produto)
        res.render('planta/addPlanta',{dados:produto})
    }
    else{
        console.log("Não foi possivel exibir os dados")
        res.redirect('/')
    }
})

module.exports = router