
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('username').notNullable();
    table.string('password').notNullable();

    const useTimestamps = true;
    const defaultToNow = true;
    // adds fields created_at, updated_at
    table.timestamps(useTimestamps, defaultToNow);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
