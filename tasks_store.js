import Task from './task.js';

export default class TaskStore{

    constructor(){
        this.tasks = [];
        this.currentId = 1;
    }

    create(title){
        const task = new Task(this.currentId++, title, false);
        this.tasks.push(task);
        return task;
    }

    findAll(){
        return this.tasks;
    }

    findById(id){
        return this.tasks.find(task => task.id === id)
    }

    findByStatus(completed){
        return this.tasks.filter(task => task.completed === completed)
    }

    update(id, updates){
        const taskIndex = this.tasks.findIndex(task => task.id === id)
        if (taskIndex === -1) return null;

        const updatedTask = {
            ...this.tasks[taskIndex],
            ...updates,
            updatedAt: new Date().toDateString
        }

        this.tasks[taskIndex] = updatedTask;
        return updatedTask;
    }

    toggle(id){
        const task = this.findById(id);
        if(!task) return null;

        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
        return task;
    }

    delete(id){
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if(taskIndex === -1) return null;

        const deletedTask = this.tasks[taskIndex];
        this.tasks.splice(taskIndex, 1);
        return deletedTask;
    }

    clearAll(){
        this.tasks = [];
        this.currentId = 1;
        return this.tasks;
    }

    count(){
        return this.tasks.length;
    }
}
