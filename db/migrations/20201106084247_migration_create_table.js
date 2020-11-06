
exports.up =async function(knex) {
   return await knex.schema
        .createTable('collections', (table) => {
            table.increments('collection_id').unsigned().primary();
            table.integer('product').notNull();
            table.string('title').notNull();
            table.string('link').notNull();
            table.timestamp('published_at').defaultTo(knex.fn.now());
        })
};

exports.down =async function(knex) {
  return await knex.schema
        .dropTable('collections')
};
