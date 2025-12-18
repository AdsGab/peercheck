exports.up = function (knex) {
  return knex.schema.createTable('task_files', table => {
    table.increments('id').primary();
    table.string('task_id', 36).notNullable(); // UUID FK
    
    // ⭐ These now match your Controller keys exactly
    table.string('mime_type').notNullable(); 
    table.string('original_name').notNullable();
    table.string('file_path').notNullable(); 
    
    table.timestamps(true, true);

    table
      .foreign('task_id')
      .references('tasks.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('task_files');
};

