const sqlite3 = require("sqlite3"); //estamos importando o sqlite (que é uma dependência pra criar conexão com o banco de dados) - sqlite3 é um drive que estabelece comunicação com o banco de dados
const sqlite = require("sqlite"); //responsável por conectar
const path = require("path") //resolve os endereços de acordo com o ambiente (os sistemas operacionais)

async function sqliteConnection() { //função assíncrona
  const database = await sqlite.open({ //open é pra abrir uma conexão - dentro da chave vamos colocar as configurações da conexão
    filename: path.resolve(__dirname /*pega de forma automática onde estamos no projeto*/, "..", "database.db"), //filename é uma propriedade pra dizer onde nosso arquivo vai ficar salvo - no caso o arquivo 'database.db' vai ficar salvo na pasta database
    driver: sqlite3.Database //estabelecendo comunicação com banco de dados
  });
    return database
}

module.exports = sqliteConnection;

