exports.up = function (knex) {
  return knex.schema.createTable('tasks', table => {
    table.string('id', 36).primary(); // UUID
    table.integer('uploader_id').unsigned().notNullable();
    table.text('description').notNullable();
    table.string('jurusan').notNullable();
    table.string('mata_kuliah').notNullable();
    table.string('tingkat').notNullable();
    table.date('deadline').notNullable();
    table.timestamps(true, true);

    table
      .foreign('uploader_id')
      .references('users.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tasks');
};
