exports.up = async(knex, Promise) => {
    return await knex.schema
        .createTable('collections', (table) => {
            table.increments('id').unsigned().primary();
            table.string('name').notNull();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .createTable('products', (table) => {
            table.increments('id').unsigned().primary();
            table.string('name').notNull();
            table.text('decription').nullable();
            table.integer('price').notNull();
            table.integer('collection_id').nullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .createTable('users', (table) => {
            table.increments('id').unsigned().primary();
            table.string('username').notNull();
            table.string('password').notNull();
            table.integer('role_id').nullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .createTable('customers', (table) => {
            table.increments('id').unsigned().primary();
            table.string('username').notNull();
            table.string('password').notNull();
            table.integer('role_id').nullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .createTable('roles', (table) => {
            table.increments('id').unsigned().primary();
            table.string('name').nullable();
        });
};

exports.down = async(knex) => {
    return await knex.schema
        .dropTable('collections')
        .dropTable('products')
        .dropTable('users')
        .dropTable('customers')
        .dropTable('roles');
};