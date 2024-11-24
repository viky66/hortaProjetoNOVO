const sequelizeDb = require('sequelize')
const sequelizeConfig = new sequelizeDb(
    'horta_db',//o nome do banco de dados
    'root',//informando o nome de usuário do banco
    '',//informando a senha do banco
    {
        dialect:'sqlite', 
        storage:'./horta_db.sqlite'//nome do arquivo onde será salvo o banco
    }
)

module.exports = {sequelizeDb, sequelizeConfig}