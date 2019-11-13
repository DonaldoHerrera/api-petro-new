'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
    up() {
        this.create('files', (table) => {
            table.increments()
            table.string('url_file',255).notNullable()
            table.boolean('status').default('active');
            table.integer('hw_id').unsigned().references('id').inTable('homework')
            table.timestamps()
        })
    }

    down() {
        this.drop('files')
    }
}

module.exports = FileSchema
