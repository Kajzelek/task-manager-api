import express from 'express';
import taskRoutes from './routes/task.routes.js'
import {errorHandler} from './middlewares/error.middleware.js'


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/tasks', taskRoutes)
app.use(errorHandler) // ->> middleware init

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app
