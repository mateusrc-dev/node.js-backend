const knex = require("../database/knex"); //importando a conexão com o banco de dados
const AppError = require("../utils/AppError");//importando AppError para lidar com excessões
const { compare } = require("bcrypt"); //importando função que vamos usar para comparar senhas criptografadas
const authConfig = require("../configs/auth") //importando configuração
const { sign } = require("jsonwebtoken") //importando sign - método do jsonwebtoken

class SessionsController { //vamos criar uma sessão para autenticação do usuário
  async create(request, response) {
    const { email, password } = request.body //desestruturando - pegando email e password do body da requisição
    const user = await knex("users").where({ email }).first(); //acessando o bando de dados - where é para acessar o email - se caso o email não tiver sido cadastrado não vai ser devolvido nada para a variável user
    if (!user) { //se o usuário não existir vai entrar nas chaves abaixo que tem uma exceção
      throw new AppError("E-mail e/ou senha incorreta!!!", 401);
    }
    const passwordMatched = await compare(password, user.password) //a variável user vai ter toda a linha na tabela do email especificado, no caso, vai ter id, nome, password que está no banco de dados, etc. - comparando a senha informada com a senha que está no banco de dados
    if (!passwordMatched) { //se caso a comparação for verdadeira, não vai entrar nas chaves
      throw new AppError("E-mail e/ou senha incorreta!!!", 401);
    }
    
    const { secret, expiresIn } = authConfig.jwt; //desestruturando - retirando propriedades da configuração
    const token = sign({}, secret, {subject: String(user.id), expiresIn})  //criando o token, vamos usar o sign - subject é o conteúdo que vai ser inserido dentro do token
    return response.json({user, token}); //quando usuário é autenticado, é devolvido informações do usuário junto com o token
  }
}

module.exports = SessionsController;