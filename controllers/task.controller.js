import * as taskService from '../services/task.service.js'

export const getAllTasks = (req, res, next) => {
    try{
        const tasks = taskService.getTasks()
        res.json(tasks)
    }
    catch(error){
        next(error)
    }
}

export const getTaskById = (req, res, next) => {
    try{
        const task = taskService.getTask(req.params.id)
        res.status(201).json(task)
    }
    catch(error){
        next(error)
    }
}

export const createTask = (req, res, next) => {
    try{
        const task = taskService.createTask({
            ...req.body,
            userId: req.user?.userId
        })
        res.status(201).json(task)
    }
    catch(err){
        next(err)
    }
}

export const updateTask = (req, res, next) => {
    try{
        const updatedTask = taskService.updateTask(req.params.id, req.body)
        res.json(updatedTask)
    }
    catch(err){
        next(err)
    }
}

export const deleteTask = (req, res, next) => {
    try{
        const deletedTask = taskService.deleteTask(req.params.id)
        res.status(204).send()
    }
    catch(err){
        next(err)
    }
}