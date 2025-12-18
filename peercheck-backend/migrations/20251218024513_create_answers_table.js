/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('answers', table => {
    // Standard auto-increment ID for answers is fine
    table.increments('id').primary();
    
    // UUID for Task ID (Must be string(36) to match the tasks table)
    table.string('task_id', 36).notNullable(); 
    
    // User ID (Assuming your users table uses increments/integers)
    table.integer('user_id').unsigned().notNullable();
    
    table.text('content').notNullable();
    
    // Timestamps
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Foreign Keys
    table.foreign('task_id').references('id').inTable('tasks').onDelete('CASCADE');
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('answers');
};