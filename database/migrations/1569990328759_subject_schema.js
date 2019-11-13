'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubjectSchema extends Schema {
    up() {
        this.create('subjects', (table) => {
            table.increments()
            table.string('name').notNullable()
            table.string('color').notNullable()
            table.string('cover_page').notNullable()
            table.text('description')
            table.integer('grade')
            table.integer('category_id').unsigned().references('id').inTable('categories')
            table.timestamps()
        })
    }

    down() {
        this.drop('subjects')
    }
}

module.exports = SubjectSchema
