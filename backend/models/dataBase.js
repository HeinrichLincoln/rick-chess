const Sequelize = require('sequelize')

const sequelize = new Sequelize("chess", "root", "root", {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate()
.then(function(){
    console.log("conexao com o banco de dados realizada com sucesso")
}).catch(function(){
    console.log("erro: conexao com o banco de dados nao realizada com sucesso")
})

module.exports = sequelize