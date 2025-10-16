import { Router } from 'express';
import { faker } from '@faker-js/faker';
import { generateUsers } from '../modules/user.mock.js';
import User from '../models/user.model.js';
import Pet from '../models/pet.model.js';

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operaciones sobre usuarios
 *   - name: Pets
 *     description: Operaciones sobre mascotas
 *   - name: Adoptions
 *     description: Operaciones sobre adopciones
 *   - name: Mocks
 *     description: Endpoints para generar/consultar datos de prueba
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB.
 *           example: 64f1c2a3b9d8f0123abc4567
 *         first_name:
 *           type: string
 *           description: Nombre del usuario.
 *           example: Juan
 *         last_name:
 *           type: string
 *           description: Apellido del usuario.
 *           example: Pérez
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario.
 *           example: juan.perez@example.com
 *         role:
 *           type: string
 *           description: Rol del usuario.
 *           enum: [user, admin]
 *           example: user
 *
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - specie
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB.
 *           example: 64f1c2a3b9d8f0123abc4568
 *         name:
 *           type: string
 *           description: Nombre de la mascota.
 *           example: Copito
 *         specie:
 *           type: string
 *           description: Especie de la mascota.
 *           example: Gato
 *
 *     Adoption:
 *       type: object
 *       required:
 *         - owner
 *         - pet
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB.
 *           example: 64f1c2a3b9d8f0123abc4569
 *         owner:
 *           type: string
 *           description: ID del usuario que adopta (ObjectId).
 *           example: 64f1c2a3b9d8f0123abc4567
 *         pet:
 *           type: string
 *           description: ID de la mascota adoptada (ObjectId).
 *           example: 64f1c2a3b9d8f0123abc4568
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *           example: Ocurrió un error inesperado
 */

/**
 * @swagger
 * /api/mocks/mockingusers:
 *   get:
 *     summary: Genera un listado de usuarios mock en memoria (sin persistir).
 *     tags: [Mocks]
 *     responses:
 *       '200':
 *         description: Listado de usuarios mock.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '500':
 *         description: Error interno.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/mocks/mockingpets:
 *   get:
 *     summary: Genera un listado de mascotas mock en memoria (sin persistir).
 *     tags: [Mocks]
 *     responses:
 *       '200':
 *         description: Listado de mascotas mock.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 *       '500':
 *         description: Error interno.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/mocks/generateData:
 *   post:
 *     summary: Inserta usuarios y mascotas mock en la base de datos.
 *     tags: [Mocks]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: integer
 *                 description: Cantidad de usuarios a insertar.
 *                 example: 10
 *               pets:
 *                 type: integer
 *                 description: Cantidad de mascotas a insertar.
 *                 example: 5
 *     responses:
 *       '201':
 *         description: Datos mock generados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Se insertaron 10 usuarios y 5 mascotas.
 *       '500':
 *         description: Error interno.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


const router = Router();

router.get('/mockingpets', (req, res) => {
    const pets = [];
    for (let i = 0; i < 20; i++) {
        pets.push({
            _id: faker.database.mongodbObjectId(),
            name: faker.animal.dog(),
            specie: faker.animal.type(),
        });
    }
    res.status(200).json({ status: 'success', payload: pets });
});

router.get('/mockingusers', (req, res) => {
    const users = generateUsers(50);
    res.status(200).json({ status: 'success', payload: users });
});

router.post('/generateData', async (req, res) => {
    const { users: userCount = 10, pets: petCount = 5 } = req.body;
    try {
        const usersToInsert = generateUsers(parseInt(userCount));
        const petsToInsert = [];
        for (let i = 0; i < parseInt(petCount); i++) {
            petsToInsert.push({
                name: faker.animal.cat(),
                specie: 'Gato',
            });
        }
        await User.insertMany(usersToInsert);
        await Pet.insertMany(petsToInsert);
        res.status(201).json({
            status: 'success',
            message: `Se insertaron ${userCount} usuarios y ${petCount} mascotas.`
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;