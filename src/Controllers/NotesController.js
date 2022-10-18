//controller para lidar com os notes
const knex = require("../database/knex") 
class NotesController {
  async create(request, response) {
    const {title, description, tags, links} = request.body; //pegando esses respectivos elementos do body/corpo da requisição
    //const {user_id} = request.params; //o id vai ser passando como um parametro na rota/caminho
    const user_id = request.user.id //acessando a propriedade que foi criada no middleware que contem o id do usuário que foi extraído do token
    const note_id = await knex("notes").insert({ //passando os objetos que vamos inserir no note_id
      title,
      description,
      user_id
    }) //precisamos recuperar o id da nota que foi cadastrada, porque tags e links são guardadas em tabelas separadas, e para registrar eles (links e tags) vamos precisar do id da nota  
    const linksInsert = links.map(link => {
      return { //criando um objeto novo que vai ser inserido o código de note_id que esse link está vinculado e mudando de link pra url
      note_id,
      url: link
    }
    }) //vai ser percorrido cada item e para cada link será retornado o note_id e url
    await knex("links").insert(linksInsert) //está sendo inserido dentro de links o objeto com o note_id e url - é um vetor - vai ser inserido de uma vez

    const tagsInsert = tags.map(name => {
      return { //criando um objeto novo que vai ser inserido o código de note_id que essa tag está vinculada
      note_id,
      name,
      user_id
    }
    }) //vai ser percorrido cada item e para cada tag será retornado o note_id, name, user_id
    await knex("tags").insert(tagsInsert) //está sendo inserido dentro de tags o objeto com o note_id, name e user_id - é um vetor - vai ser inserido de uma vez
    return response.json();
  }

  async show(request, response) {
    const {id} = request.params //vamos pegar o id que foi passado como um parâmetro para poder encontrar a nota do usuário
    const note = await knex("notes").where({id}).first(); //pegando a primeira nota com first, sempre vai retornar uma única nota do id especificado
    const tags = await knex("tags").where({note_id: id}).orderBy("name"); //pegando a tag onde o note_id vai ser igual ao id passado no parâmetro/rota - orderBy é pra colocar em ordem alfabética
    const links = await knex("links").where({note_id: id}).orderBy("created_at")
    return response.json({...note, tags, links}); // os '...' é para 'despejar' os detalhes de note
  }

  async delete(request, response) { //criando a funcionalidade de deletar
    const {id} = request.params;
    await knex("notes").where({id}).delete(); //tudo vai ser deletado em cascata, links, tags, pois essas tabelas tem relação com notes
    return response.json()
  }

  async index(request, response) { //criando funcionalidade que vai ser responsável por listar todos os notes de um usuário
    const {title, tags} = request.query;
    const user_id = request.user.id
    let notes;
    
    if (tags) { //se existir tags vai ocorrer a consulta esse chaves, se não vai ser realizada a consulta abaixo no else
      const filterTags = tags.split(',').map(tag => tag.trim()); //vamos dividir os elementos a partir da vírgula e cada elemento fará parte de um vetor/array - map pra pegar somente a tag (vai pegar cada tag do vetor) - função TRIM apara uma string removendo os espaços em branco iniciais e finais
      notes = await knex("tags").select(["notes.id", "notes.title", "notes.user_id"]).where("notes.user_id", user_id).whereLike("notes.title", `%${title}%`).whereIn("name", filterTags).innerJoin("notes", "notes.id", "tags.note_id").groupBy("notes.id").orderBy("notes.title") //analisar notes baseado na tag - vamos passar o "name" (nome da tag) e o vetor pra comparar se a tag existe ou não - no select vamos colocar um array com os campos que queremos selecionar de ambas as tabelas - também vamos filtrar baseado no id do usuário - innerJoin é pra conectar uma tabela com a outra, vamos colocar a tabela notes e os campos que vão ser conectados - groupBy é uma funcionalidade do banco de dados que permite fazer agrupamentos sem repetir os elementos (não vai repetir notes com o mesmo id)
    } else {
    notes = await knex("notes").where({user_id}).whereLike("title", `%${title}%`).orderBy("title") //vai mostrar o notes de um usuário determinado - where é para filtrar - orderBy é pra deixar em ordem alfabética de acordo com o title - whereLike ajuda a buscar valores que contenham uma palavra determinada no meio de outras, a porcentagem antes e depois de title é porque vai ser ignorado o que vem antes e depois da palavra, vai ser procurado a palavra, ou uma cadeia de caracteres
    }

    const userTags = await knex("tags").where({user_id}) //fazendo filtro nas tags onde o id seja igual do user_id
    const notesWithTags = notes.map(note => { //percorrendo todas as notas e executando a função pra cada 'note' (variável auxiliar)
      const noteTags = userTags.filter(tag => tag.note_id === note.id) //filtrando as tags da nota - comparando se note_id da tag é igual ao note.id 
      return {
        ...note,
        tags: noteTags
      }
    }) 

    return response.json(notesWithTags) 
  }  
}
module.exports = NotesController