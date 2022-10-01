const path = require("path") //path para adequar o caminho a diferentes sistemas operacionais

module.exports = {
  development: { //vamos deixar apenas o objeto que tem configurações de qual tipo de banco de dados vamos usar e qual o arquivo do banco de dados
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db") //path para adequar o caminho a diferentes sistemas operacionais - dirname é o arquivo atual
    },
    migrations: { //automatizando criação de tabelas - mostrando local que vai ser armazenado essas informações
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true //propriedade padrão pra trabalhar com o sqlite
  }
};
