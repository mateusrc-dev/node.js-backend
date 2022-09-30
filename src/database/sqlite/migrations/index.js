const sqliteConnection = require('../../sqlite');
const createUsers = require('./createUsers')

async function migrationsRun() { //para rodar as migrations
  const schemas = [createUsers].join(''); //schemas é as tabelas
  sqliteConnection().then(db => db.exec(schemas)).catch(error => console.log(error));
}

module.exports = migrationsRun; 