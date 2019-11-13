'use strict'
const Subject = use('App/Models/Subject');
class SubjectController {

    async index({ request, response, view }) {
        try{
            let subjects = await Subject.query().with('category').orderBy('created_at','desc').fetch();
            return response.status(201).json({
                "message":"Listado de materias",
                "data":subjects
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async store({ request, response }) {
        try{
            let subject = await Subject.create(request.all());
            return response.status(201).json({
                "message":"La materia fue agregado correctamente",
                "data":subject
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async show({ params, request, response, view }) {
        try{
            let subjects = await Subject.findOrFail(params.id);
            return response.status(201).json({
                "message":"Detalle de materia",
                "data_subject":subjects,
                "data_category": await subjects.category().fetch(),
                "data_homeworks": await subjects.homeworks().with('user').fetch()
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async update({ params, request, response }) {
        try{
            let subject = await Subject.findOrFail(params.id);
            subject.merge(request.all());
            await subject.save();
            return response.status(201).json({
                "message":"La materia fue actualizada correctamente",
                "data":subject
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
}

module.exports = SubjectController
