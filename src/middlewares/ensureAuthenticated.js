const { verify } = require("jsonwebtoken")//verify é uma função que está disponível dentro do jsonwebtoken
const AppError = require("../utils/AppError")//importando as exceções
const authConfig = require("../configs/auth")//importando configs

function ensureAuthenticated(request, response, next) { //middleware recebe requisição, resposta e destino da requisição
  const authHeader = request.headers.authorization; //o token do usuário está dentro da requisição do usuário, no cabeçalho da requisição vai ter o token de autorização

  if (!authHeader) { //verificando se o token não existe
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ") //vamos acessar através de um vetor o que está dentro do header - split é pra quebrar uma string de acordo com o caractere de referência e cada nova parte vai ser um elemento de um vetor - isso é pra separar do token uma parte que não faz parte dele - como não me importo com essa parte que não é o token, vou colocar apenas uma vírgula e depois a variável que vai receber o token (dentro dos cochetes)

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret) //verificar se o token é um token válido - se for válido vai ser devolvido o sub - vamos criar um apelido pra esse sub de user_id pra ficar mais semântico
    request.user = { //criando uma propriedade dentro da requisição chamada user que vai ter o id do usuário
      id: Number(user_id), //transformando o user_id para número - aqui conseguimos obter o id do usuário da requisição
    }; 
    return next(); //vai prosseguir para a próxima função normalmente
  } catch {
    throw new AppError("JWT Token inválido", 401);
  }
}

module.exports = ensureAuthenticated;

