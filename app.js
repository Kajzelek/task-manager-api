import 'dotenv/config.js';
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'
import express from 'express';
import taskRoutes from './routes/task.routes.js'
import userRoutes from './routes/user.routes.js'
import {errorHandler} from './middlewares/error.middleware.js'


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const swaggerUiOptions = {
    swaggerOptions: {
        defaultModelsExpandDepth: 2,
        defaultModelExpandDepth: 2,
    },
}

app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(swaggerSpec, swaggerUiOptions))
app.get('/api-docs/', swaggerUi.setup(swaggerSpec, swaggerUiOptions))
app.get('/openapi.json', (req, res) => res.json(swaggerSpec))
app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)
app.use(errorHandler) // ->> middleware init

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app
