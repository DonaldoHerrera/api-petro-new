'use strict'
const HomeWork = use('App/Models/Homework');

class HomeworkController {

    async index({ request, response, view }) {
        try{
            let homeworks = await HomeWork.query().with('user').with('subject').orderBy('created_at','desc').fetch();
            return response.status(201).json({
                "message":"Listado de tareas ó publicaciones",
                "data":homeworks
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async store({ request, response }) {
        try{
            let homework = await HomeWork.create(request.all());
            return response.status(201).json({
                "message":"La Tarea fue agregada correctamente",
                "data":homework
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async show({ params, request, response, view }) {
        try{
            let homework = await HomeWork.findOrFail(params.id);
            return response.status(201).json({
                "homework":homework,
                "subject":await homework.subject().with('category').fetch(),
                "files":await homework.files().orderBy('type','asc').fetch(),
                "user":await homework.user().fetch()
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async update({ params, request, response }) {
    }
    async destroy({ params, request, response }) {
    }
}

module.exports = HomeworkController
