//Carregando modulos
const express = require('express');
const handlebars = require('express-handlebars')

const app = express()
const porta = 5000 

//configurar express para receber os dados do formulario
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//configurando handlebars
app.engine('handlebars', handlebars.engine({extended:true}))
app.set('view engine', 'handlebars')//definindo o handlebars como mecanismo de visualização padrão


//carregando rotas 
const plantaRouter = require('./routes/planta') 
const colheitaRouter = require('./routes/colheita');  // caminho para o arquivo de rotas  

//ultilizando rotas 
app.use('/planta',plantaRouter)
app.use('/colheita', colheitaRouter);// Define o prefixo '/colheita' para as rotas


// EXIBINDO INFORMAÇÕES NA TELA
app.get("/",(req, res)=>{
    //res.send("<h1>Tudo Funcionando</h1>")
    res.render('home')
})


//EXECUTANDO O SERVIDOR
try {
  app.listen(porta, () => {
      console.log("Servidor executando na porta", porta);
  });
} catch (error) {
  console.error("Erro ao iniciar o servidor:", error.message);
}