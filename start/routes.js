'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return { greeting: 'Hello world in JSON' }
})

Route.group(()=>{
    Route.post('login','AuthController.login');
    Route.post('register','AuthController.register');
    Route.put('logout/:user_id','AuthController.logout');
}).prefix('api/v1/auth');

Route.group(() => {
    Route.resource('categories', 'CategoryController').apiOnly();
    Route.resource('subjects','SubjectController').apiOnly();
    Route.resource('homeworks','HomeworkController').apiOnly();
    Route.resource('users','UserController').apiOnly();
    Route.get('users-actives','UserController.logged');

    Route.get('messages/:send_id/:get_id','MessageController.getMessages');
    Route.post('messages','MessageController.addMessage');
}).prefix('api/v1');
