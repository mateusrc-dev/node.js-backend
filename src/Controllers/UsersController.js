const AppError = require("../utils/AppError")
class UsersController { //vamos usar class porque ela permite que dentro dela possamos criar várias funções e acessar várias funções depois
  /** - um controller pode ter no máximo 5 métodos (ou 5 funções):
   * index - método GET para listar vários registros
   * show - método GET para exibir um registro específico
   * create - método POST para criar um registro
   * update - método PUT para atualizar um registro
   * delete - método DELETE para remover um registro
   * - se precisar criar mais de 5 métodos, vale a pena criar um controller separado
  */
  create(request, response) { //é aqui onde é processado as informações, a requisição do usuário e a resposta da requisição, não em rotes
    const { name, email, password } = request.body //desestruturando - estamos "pescando" as informações do body / no POST as informações são enviadas pelo body
    //response.send(`Usuário: ${name} - Email: ${email} - Senha: ${password}`); //precisamos usar o insomnia para obter essa resposta, pois o navegador trabalha apenas com o GET - ao usar 'send' para devolver as informações, essas informações são devolvidas como um html
    if(!name) { //se não existir o nome vai entrar nas chaves
      throw new AppError("Nome é obrigatório!") //fazendo uma excessão - o que está sendo digitado entre parenteses vai ser a message no construtor
    }
    response.status(201).json({name, email, password}) //se no lugar de 'send' usarmos 'json' essas informações vão ser devolvidas como json
  }
}
module.exports = UsersController;