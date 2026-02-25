import * as userService from '../services/user.service.js'

export const login = async (req,res,next) => {
    try{
        const login = await userService.login({
            email: req.body.email,
            password: req.body.password
        })
        res.json(login)
    }
    catch(error){
        next(error)
    }
}

export const register = async (req,res,next) => {
    try{
        const register = await userService.register({
            email: req.body.email,
            password: req.body.password
        })
        res.json(register)
    }
    catch(error){
        next(error)
    }
}