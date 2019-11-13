'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomeworkSchema extends Schema {
    up() {
        this.create('homework', (table) => {
            table.increments()
            table.string('title').notNullable()
            table.text('description')
            table.boolean('status')
            table.integer('user_id').unsigned().references('id').inTable('users')
            table.timestamps()
        })
    }

    down() {
        this.drop('homework')
    }
}

module.exports = HomeworkSchema
