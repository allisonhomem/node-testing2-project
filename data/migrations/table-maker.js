exports.up = function (knex) {
    return knex.schema.createTable('library', (table) => {
        table.increments('book_id')
        table.string('title', 50)
             .unique()
             .notNullable()
        table.string('author', 50)
             .defaultTo('anonymous')
        table.string('summary', 500)
             .notNullable()
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('library');
}