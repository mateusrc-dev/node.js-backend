//arquivo onde tem a função de salvar a imagem e deletar a imagem no banco de dados
const fs = require('fs') //importando fs que é do próprio node pra lidar com manipulação de arquivos
const path = require("path") //path pra navegar pelos diretórios
const uploadConfig = require('../configs/uploads') //trazendo as configurações de upload

class DiskStorage {
  async saveFile(file){ 
    await fs.promises.rename( //mudando o arquivo de lugar
      path.resolve(uploadConfig.TMP_FOLDER, file), //pegando o arquivo da pasta atual (lugar onde a pasta fica quando chega)
      path.resolve(uploadConfig.UPLOADS_FOLDER, file) //levando o arquivo para a nova pasta para salvar o arquivo (lugar onde o arquivo realmente vai ficar)
    )
    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file) //pegando o arquivo que já está salvo 
    try { //quando se trabalha com manipulação de arquivos é sempre bom usar exceções pra evitar parar a aplicação devido um erro por o arquivo não existir mais
      await fs.promises.stat(filePath); //conferindo se o filePath existe
    } catch {
      return;
    }
    await fs.promises.unlink(filePath) //função para deletar um arquivo
  }
}

module.exports = DiskStorage;