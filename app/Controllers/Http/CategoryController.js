'use strict'
const Category = use('App/Models/Category');
class CategoryController {

    async index({ request, response, view }) {
        try{
            let categories = await Category.query().orderBy('created_at','desc').fetch();
            return response.status(201).json({
                "message":"Listado de categorias",
                "data":categories
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async store({ request, response }) {
        try{
            let category = await Category.create(request.all());
            return response.status(201).json({
                "message":"La categoria fue agregada correctamente",
                "data":category
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async show({ params, request, response, view }) {
        try{
            let category = await Category.findOrFail(params.id);
            return response.status(201).json({
                "message":"Detalle de la categoria",
                "data":category,
                "data_subjects":await category.subjects().fetch()
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async update({ params, request, response }) {
        try{
            let category = await Category.findOrFail(params.id);
            category.merge(request.all());
            await category.save();
            return response.status(201).json({
                "message":"La categoria fue actualizada correctamente",
                "data":category
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
    async destroy({ params, request, response }) {
        try{
            let category = await Category.findOrFail(params.id);
            category.is_active = "no-active";
            await category.save();
            return response.status(201).json({
                "message":"La categoria fue dada de baja correctamente",
                "data":category
            });
        }catch(error){
            let message = "Ocurrio un problema en el servidor, Error: "+error.message;
            return response.status(500).json(message);
        }
    }
}

module.exports = CategoryController
