let tasks = [];

export const getAll = () => tasks

export const getById = (id) => 
    tasks.find(t => t.id === id);

export const create = (task) => {
    tasks.push(task)
    return task
}

export const update = (id, updatedFields) => {
    const task = tasks.find(t => t.id === id)
    if(!task) return null

    Object.assign(task, updatedFields)
    return task
}

export const remove = (id) => {
    const index = tasks.findIndex(t => t.id === id)
    if(index === -1) return false

    tasks.splice(index, 1)
    return true
}
