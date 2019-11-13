'use strict'
const User = use('App/Models/User');
class AuthController {

    async login({request,auth,response}){
        const email    = request.input('email');
        const password = request.input('password');
        
        try{
            if (await auth.attempt(email, password)) {
                let user  = await User.findBy('email', email);
                let accessToken = await auth.generate(user);
                return response.status(201).json({ "user": user, "access_token": accessToken });
            }
        }catch(error){
            return response.status(401).json({
                "msj":"Necesitas estar registrado",
                "error":error.message
            });
        }
    }

    async register({request,auth,response}){
        const data = request.all();
        try{
            let user = await User.create(data);
            let accessToken = await auth.generate(user);
            return response.status(201).json({ "user": user, "access_token": accessToken });
        }catch(error){
            return response.status(500).json({
                "msj":"ha ocurrido un error al registrarte, intentalo de nuevo",
                "error":error.message
            });
        }
    }

    async logout({request,auth,params,response}){
        const user_id = params.user_id;
        try{    
            let user = await User.findOrFail(user_id);
            user.is_active = 0;
            await user.save();
            return response.status(200).json({
                "msg":"Has sido deslogeado correctamente"
            });
        }catch(error){
            return response.status(500).json({
                "msj":"ha ocurrido un error al registrarte, intentalo de nuevo",
                "error":error.message
            });
        }
    }

}
module.exports = AuthController
