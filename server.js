import express from 'express'
import cors from 'cors'
import TaskStore from './tasks_store.js'

const app = express();
const PORT = process.env.PORT || 3000;

const taskStore = new TaskStore();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

// ============= CRUD ROUTES =============

//CREATE ROUTE
app.post('/api/add_task', (req,res) =>{
    try{
        const {title} = req.body;
        if(!title || title.trim() === ''){
            return res.status(400).json({
                success: false,
                message: 'Task title is required'
             });
        }

        const task = taskStore.create(title.trim());

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error creating task',
            error: error.message
        });
    }
});


app.get('/api/tasks', (req,res) => {
    try{
        const { completed } = req.query;
        let tasks;
        if(completed !== undefined){
            const isCompleted = completed === 'true';
            tasks = taskStore.findByStatus(isCompleted);
        }else{
            tasks = taskStore.findAll();
        }

        res.json({
            success: true,
            count: tasks.length,
            data: tasks,
            message: "Tasks returned correctly"
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Error fetching data",
            error: error.message
        });
    }
});


app.get('/api/task/:id', (req,res) => {
    try{
        const id = parseInt(req.params.id);
        const task = taskStore.findById(id);

        if(!task){
            return res.status(404).json({
                success: false,
                message: `Task with ID ${id} not found`
            });
        }

        res.json({
            success: true,
            data: task
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error fetching task',
            error: error.message
        });
    }
});


app.put('/api/tasks/:id', (req, res) => {
    try{
        const taskId = parseInt(req.params.id);
            const {title, completed} = req.body;

            if(!title || title.trim() === ''){
                return res.status(400).json({
                    success: false,
                    message: 'Task title is required'
                });
            }

            const updates = {
                title: title.trim(),
                completed: completed !== undefined ? completed : false
            };

            const updatedTask = taskStore.update(taskId, updates)

            if(!updatedTask){
                return res.status(404).json({
                    success: false,
                    message: `Task with ID ${id} not found`
                });
            }

            res.json({
                success: true,
                message: 'Task updated correctly!',
                data: updatedTask
            });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error while updating task',
            error: error.message
        });
    }

});

app.patch('/api/tasks/:id/toggle', (req,res) => {
    try{
        const taskId = parseInt(req.params.id);
        const patchedTask = taskStore.toggle(taskId);

        if(!patchedTask){
            res.status(404).json({
                success: false,
                message: 'task not found with given Id'
            });
        }
        res.status(201).json({
            success: true,
            message: 'Task patched correctly!',
            data: patchedTask
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error while patching',
            error: error.message
        });
    }
});






const server = app.listen(PORT, () => {
  console.log(`\n🚀 Task API Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n📌 Available endpoints:`);
  console.log(`   GET    http://localhost:${PORT}/`);
  console.log(`   GET    http://localhost:${PORT}/health`);
  console.log(`   GET    http://localhost:${PORT}/api/tasks`);
  console.log(`   GET    http://localhost:${PORT}/api/tasks/:id`);
  console.log(`   POST   http://localhost:${PORT}/api/tasks`);
  console.log(`   PUT    http://localhost:${PORT}/api/tasks/:id`);
  console.log(`   PATCH  http://localhost:${PORT}/api/tasks/:id`);
  console.log(`   PATCH  http://localhost:${PORT}/api/tasks/:id/toggle`);
  console.log(`   DELETE http://localhost:${PORT}/api/tasks/:id`);
  console.log(`\n📦 Task store initialized - empty and ready for CRUD operations`);
});