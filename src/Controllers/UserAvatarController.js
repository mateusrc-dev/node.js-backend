const knex = require("../database/knex") //importando a conexão com o banco de dados
const DiskStorage = require("../providers/DiskStorage") //importando funcionalidades de criar e deletar usuário
const AppError = require("../utils/AppError") //importando exceções

class UserAvatarController {
  async update(request, response) { //função que vai atualizar avatar
    const user_id = request.user.id //pegando id do usuário pelo token
    const avatarFilename = request.file.filename //pegando o nome do arquivo que está no request - colocamos um hash no nome do arquivo
    const diskStorage = new DiskStorage()
    const user = await knex("users").where({ id: user_id }).first() //buscando o usuário no banco de dados na tabela users onde (where) o id é igual a user_id - vamos buscar os dados do usuário pra atualizar o avatar do usuário no banco de dados
    if (!user) { //verificando se o usuário é autenticado
      throw new AppError("Somente usuários autenticados podem mudar o avatar!", 401)
    }
    if (user.avatar) { //se o avatar existir precisamos deletar essa foto pra ela não ficar perdida
      await diskStorage.deleteFile(user.avatar) //deletando a foto antiga
    }
    const filename = await diskStorage.saveFile(avatarFilename) //vamos pegar a nova foto e levar ela para a pasta upload
    user.avatar = filename //atualizando a foto no banco de dados
    await knex("users").update(user).where({ id: user_id });
    return response.json(user)
  }
}
module.exports = UserAvatarController;