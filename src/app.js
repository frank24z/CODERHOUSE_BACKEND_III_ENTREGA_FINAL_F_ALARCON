import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/database.js';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import mocksRouter from './routers/mocks.router.js';
import adoptionRouter from './routers/adoption.router.js';
import User from './models/user.model.js';
import Pet from './models/pet.model.js';

/**
 * @swagger
 * /api/users:
 * get:
 * summary: Obtiene todos los usuarios
 * tags: [Users]
 * responses:
 * "200":
 * description: Se obtuvo el listado de usuarios correctamente.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/User'
 */

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- Configuración de Swagger ----
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de la API del Proyecto Final',
            description: 'API para la gestión de usuarios, mascotas y adopciones.'
        }
    },
    apis: [`${process.cwd()}/src/routers/*.js`, `${process.cwd()}/src/app.js`]
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// ---- RUTAS ----
app.use('/api/mocks', mocksRouter); 
app.use('/api/adoptions', adoptionRouter); 



app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.get('/api/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json({ status: 'success', payload: pets });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
});

export default app;