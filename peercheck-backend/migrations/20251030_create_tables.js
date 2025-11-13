exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password_hash');
    table.string('major');
    table.string('class');
    table.integer('contribution_points').defaultTo(0);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('tasks', table => {
    table.uuid('id').primary();
    table.uuid('uploader_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('title').notNullable();
    table.string('course');
    table.string('filename').notNullable();
    table.string('file_path').notNullable();
    table.integer('filesize').notNullable();
    table.enu('status', ['pending', 'reviewing', 'completed']).defaultTo('pending');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('review_assignments', table => {
    table.uuid('id').primary();
    table.uuid('task_id').references('id').inTable('tasks').onDelete('CASCADE');
    table.uuid('reviewer_id').references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('assigned_at').defaultTo(knex.fn.now());
    table.timestamp('completed_at').nullable().defaultTo(null);
    table.enu('status', ['assigned', 'done']).defaultTo('assigned');
    table.unique(['task_id', 'reviewer_id']);
  });

  await knex.schema.createTable('reviews', table => {
    table.uuid('id').primary();
    table.uuid('task_id').references('id').inTable('tasks').onDelete('CASCADE');
    table.uuid('reviewer_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('rating').notNullable();
    table.text('comment').notNullable();
    table.timestamps(true, true);
    table.unique(['task_id', 'reviewer_id']);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('reviews');
  await knex.schema.dropTableIfExists('review_assignments');
  await knex.schema.dropTableIfExists('tasks');
  await knex.schema.dropTableIfExists('users');
};
