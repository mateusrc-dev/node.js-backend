const config = require("../../../knexfile"); //importando as configurações do arquivo knexfile
const knex = require("knex") //importando o knex
const connection = knex(config.development) //criando a conexão knex e passando como argumento as configurações que estão no arquivo knexfile - criando uma conexão do knex com o banco de dados

module.exports = connection; //exportando a conexão knex 