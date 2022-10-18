const knex = require("../database/knex")
class TagsController {
  async index(request, response) { //função que vai ser responsável por listar todas as tags cadastradas do usuário
    const user_id = request.user.id //acessando a propriedade que foi criada no middleware que contem o id do usuário que foi extraído do token
    //const {user_id} = request.params //pegando o user_id do parâmetro
    const tags = await knex("tags").where({user_id}).groupBy("name") //indo nas tags e pegando apenas as tags que tem o user_id especificado - groupBy("name") é um recurso do banco de dados pra fazer um agrupamento (no caso vai ser por nome) e ele vai remover nomes duplicados
    return response.json(tags) //devolvendo as tags
  }
}

module.exports = TagsController;