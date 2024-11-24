const database = require('./database');
const planta = require('./planta')

//criando tabela
const colheita = database.sequelizeConfig.define(
    'colheita',
    {
        
        data_colheita:{
            type:database.sequelizeDb.DATE,
            allowNull:false
        },
        quantidade_colhida:{
            type:database.sequelizeDb.INTEGER,
            allowNull:false
        }
    }
)
//definindo que uma planta pertence a varias colheitas, mas uma colheita pertence a uma só planta.
planta.hasMany(colheita,{
    foreignKey: 'plantaId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
})
colheita.belongsTo(planta, {
    foreignKey: 'plantaId',
})  


colheita.sync()
module.exports = colheita;