//arquivo de configurações de autenticação
module.exports = { //exportando o objeto
  jwt: {
    secret: process.env.AUTH_SECRET || "default", //isso é a chave secreta, utilizado para gerar o token
    expiresIn: "1d" //tempo de expiração do token
  }
}