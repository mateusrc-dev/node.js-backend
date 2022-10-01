exports.up = knex => knex.schema.createTable("notes", table => { //processo de criar a tabela chamada Notes
  table.increments("id"); //dentro da tabela vamos ter um campo incremental chamado id
  table.text("title"); //dentro da tabela vamos ter o título, um campo do tipo texto
  table.text("description");
  table.integer("user_id").references("id").inTable("users"); //criando um campo do tipo inteiro chamado user.id que faz referência ao id que existe dentro da tabela do usuário - ou seja, só existe uma nota se existir o usuário, porque a nota vai estar vínculada ao usuário
  table.timestamp("created_at").default(knex.fn.now()); //fn tem uma função chamada now que vai criar o timestamp
  table.timestamp("update_at").default(knex.fn.now());
}); 
exports.down = knex => knex.schema.dropTable("notes"); //processo de deletar a tabela 
