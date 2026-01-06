/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('comments', function(table) {
    // 1. Comment ID: Keep as UUID because the Controller generates it manually
    table.uuid('id').primary(); 
    
    // 2. Link to Answer: Changed to Integer (unsigned) to match 'answers.id'
    table.integer('answer_id').unsigned().notNullable()
      .references('id').inTable('answers').onDelete('CASCADE');

    // 3. Link to User: Changed to Integer (unsigned) to match 'users.id'
    // NOTE: If your users table uses UUIDs, change this line to: table.uuid('user_id')...
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users');

    table.text('content').notNullable();
    
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};