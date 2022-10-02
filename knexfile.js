const path = require("path") //path para adequar o caminho a diferentes sistemas operacionais

module.exports = {
  development: { //vamos deixar apenas o objeto que tem configurações de qual tipo de banco de dados vamos usar e qual o arquivo do banco de dados
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db") //path para adequar o caminho a diferentes sistemas operacionais - dirname é o arquivo atual
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb) //conseguimos recuperar nessa função o conn(conexão) e cb(callback) - run é pra rodar - o comando "PRAGMA foreign_keys = ON" é pra habilitar a funcionalidade de apagar as tags quando uma nota por deletada
    },//pool é uma funcionalidade que o que será colocado dentro dela será executado no momento que for estabelecido conexão com o banco de dados
    migrations: { //automatizando criação de tabelas - mostrando local que vai ser armazenado essas informações
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true //propriedade padrão pra trabalhar com o sqlite
  }
};
