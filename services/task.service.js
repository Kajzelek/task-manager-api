import { error } from 'console'
import * as store from '../data/tasks.store.js'
import {randomUUID} from 'crypto'

export const getTasks = () => {
    return store.getAll()
}

export const getTask = (id) => {
    const task = store.getById(id)
    if(!task){
        const error = new Error('Task not found')
        error.status = 404
        throw error
    }
    return task
}

export const createTask = ({title, description}) => {
    if(!title){
        const error = new Error("Title is required")
        error.status = 400
        throw error
    }

    const newTask = {
        id: randomUUID(),
        title: title,
        description: description,
        completed: false
    }

    return store.create(newTask)
}

export const updateTask = (id, data) => {
    const updated = store.update(id,data)
    if(!updated){
        const error = new Error("Task not found")
        error.status = 404
        throw error
    }
    return updated
}

export const deleteTask = (id) => {
    const deletedTask = store.remove(id)
    if(!deletedTask){
        const error = new Error("Task not found")
        error.status = 404
        throw error
    }
}