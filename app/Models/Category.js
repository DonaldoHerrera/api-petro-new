'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    subjects(){
        return this.hasMany('App/Models/Subject');
    }
}

module.exports = Category
