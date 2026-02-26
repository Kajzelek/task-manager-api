import * as usersStore from '../data/users.store.js'
import bcrypt from 'bcrypt'
import {randomUUID} from 'crypto'
import jwt from 'jsonwebtoken'

export const register = async ({email, password}) => {

    if(!email || !password){
        const error = new Error('Email and password are required to register!')
        error.status = 400
        throw error
    }

    if(usersStore.findByEmail(email)){
        const error = new Error('Account already registered with this email')
        error.status = 409
        throw error
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = 
    {
        id: randomUUID(),
        email: email,
        passwordHash: hashedPassword,
        createdAt: new Date()
    }

    usersStore.createUser(user)

    const {passwordHash, ...safeUser} = user
    return safeUser
}   


export const login = async ({email, password}) => {
    if(!email || !password){
        const error = new Error('Email and password are required to register!')
        error.status = 400
        throw error
    }

    const user = usersStore.findByEmail(email)

    if(!user){
        const error = new Error('Invalid Credentials')
        error.status = 401
        throw error
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)

    if(!isValid){
        const error = new Error('Invalid Credentials')
        error.status = 401
        throw error
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'})

    const {passwordHash , ...safeUser} = user

    return {
        user: safeUser,
        token: token
    }
}