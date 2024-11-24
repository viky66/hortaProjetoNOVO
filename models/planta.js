const {sequelizeDb, sequelizeConfig} = require('./database')/*estamos utilizando o recurso de desestruturação de objetos
para importar a penas os módulos necessários*/

//criando a tabela
const planta = sequelizeConfig.define(
    'planta', //nome tabela
    {
        nome:{
            type:sequelizeDb.STRING
        },
        data_plantio:{
            type:sequelizeDb.DATE
        },
        tipo:{
            type:sequelizeDb.STRING
        },
        quantidade:{
            type:sequelizeDb.INTEGER
        }
    }
)

planta.sync()
module.exports = planta