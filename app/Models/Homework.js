'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Homework extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }
    subject(){
        return this.belongsTo('App/Models/Subject');
    }
    files(){
        return this.hasMany('App/Models/File');
    }
}

module.exports = Homework
