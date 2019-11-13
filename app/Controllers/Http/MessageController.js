'use strict'
const Message = use('App/Models/Message');
class MessageController {

  async getMessages({request,params,response}){
    try{
      let send_id = params.send_id;
      let get_id  = params.get_id;
  
      let messages = await Message.query()
      .where('send',send_id)
      .where('get',get_id)
      .fetch();
      return response.status(200).json(messages);
    }catch(error){
      return response.json(error.message);
    }
    
  }
  
  async addMessage({request,response}){
    try{
      let body = request.body;
      let message = await Message.create(body);
      let messages = await Message.query().where('send',request.input('send')).where('get',request.input('get'))
      .orWhere('send',request.input('get'))
      .orWhere('get',request.input('send'))
      .orderBy('created_at','asc')
      .fetch();
      return response.json(messages);
    }catch(error){
      return response.json(error.message);
    }
  }
  async index ({ request, response, view }) {
    
  }
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new message.
   * POST messages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single message.
   * GET messages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing message.
   * GET messages/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update message details.
   * PUT or PATCH messages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a message with id.
   * DELETE messages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MessageController
