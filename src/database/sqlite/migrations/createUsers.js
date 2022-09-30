const createUsers = `
  CREATE TABLE IF NOT EXISTS users ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_atTIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`; //o IF NOT EXISTS é para não dar erro, pois essa tabela pode existir no beekeeper, a tabela só vai ser criada se ela não existir

module.exports = createUsers;

