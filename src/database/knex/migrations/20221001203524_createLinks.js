exports.up = knex => knex.schema.createTable("links", table => { //processo de criar a tabela chamada Notes
  table.increments("id"); //dentro da tabela vamos ter um campo incremental chamado id
  table.text("url").notNullable(); //dentro da tabela vamos ter a coluna url, um campo do tipo texto - notNullable é que não vai ser aceito valores nulos
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); //onDelete("CASCADE") significa que se for deletada a nota a qual a url está vínculada, a url vai ser deletada também
  table.timestamp("created_at").default(knex.fn.now()); //fn tem uma função chamada now que vai criar o timestamp 
}); 
exports.down = knex => knex.schema.dropTable("links"); //processo de deletar a tabela 