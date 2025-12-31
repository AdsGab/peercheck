exports.up = function(knex) {
  return knex.schema.createTable('ratings', function(table) {
    table.uuid('id').primary();
    
    // Link to Answer (Review)
    table.integer('answer_id').unsigned().notNullable()
      .references('id').inTable('answers').onDelete('CASCADE');

    // Link to User who rated
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users');

    table.integer('score').notNullable(); // 1 to 5
    
    table.timestamps(true, true);

    // Ensure a user can only rate an answer once
    table.unique(['answer_id', 'user_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ratings');
};