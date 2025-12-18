exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password_hash').notNullable();
    table.string('major');
    table.string('class_name');
    table.integer('contribution_points').defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
