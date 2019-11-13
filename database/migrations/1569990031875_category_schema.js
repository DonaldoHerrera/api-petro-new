'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
    up() {
        this.create('categories', (table) => {
            table.increments()
            table.string('name').notNullable()
            table.string('cover_page').notNullable()
            table.string('is_active').default('active')
            table.string('color').notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('categories')
    }
}

module.exports = CategorySchema
