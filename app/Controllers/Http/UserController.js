'use strict'
const  User = use('App/Models/User');
class UserController {

    async index({ request, response, view }) {
        try{
            let users = await User.query().orderBy('created_at','desc').fetch();
            return response.status(201).json({
                "message":"Listado de usuarios",
                "data":users
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async logged({ request, response, view }) {
        try{
            let users = await User.query()
                .where('is_active',1)
                .orderBy('created_at','desc')
                .select('id','username','email')
                .fetch();
            return response.status(201).json({
                "message":"Listado de usuarios logeados",
                "data":users
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async store({ request, response }) {
        try{
            let user = await User.create(request.all());
            return response.status(201).json({
                "message":"El usuario fue agregado correctamente",
                "data":user
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async show({ params, request, response, view }) {
        try{
            let user = await User.findOrFail(params.id);
            return response.status(201).json({
                "message":"Detalle del usuario",
                "data-subjects":user,
                "data-homeworks":await user.homeworksUploads().fetch()
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async update({ params, request, response }) {
        try{
            let user = await User.findOrFail(params.id);
            user.merge(request.all());
            await user.save();
            return response.status(201).json({
                "message":"Ell usuario fue actualizado correctamente",
                "data":user
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
}

module.exports = UserController
