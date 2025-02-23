import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import dotenv from 'dotenv'
import mocksRouter from './routes/mocks.router.js';
import swaggerJSDoc from "swagger-jsdoc"; 
import swaggerUiExpress from "swagger-ui-express"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT||3001;
const MONGO_URI = process.env.MONGO_URI

mongoose.set('strictQuery', true);

mongoose.connect(MONGO_URI)
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use(express.json());
app.use(cookieParser());

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación de la Web Adoptame",
            description: "App dedicada a encontrar familias para los perritos de la calle"
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

const specs = swaggerJSDoc(swaggerOptions); 

app.use('/api/mocks', mocksRouter);
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs)); 

app.get("/", (req, res) => {
    res.redirect("/apidocs");
});

app.listen(PORT,()=>console.log(`Servidor corriendo en http://localhost:${PORT}`))