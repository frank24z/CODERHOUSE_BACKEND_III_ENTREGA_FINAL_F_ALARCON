import { Router } from 'express';
import { faker } from '@faker-js/faker';
import { generateUsers } from '../modules/user.mock.js';
import User from '../models/user.model.js';
import Pet from '../models/pet.model.js';

/**
 * @swagger
 * components:
 * schemas:
 * User:
 * type: object
 * required:
 * - first_name
 * - last_name
 * - email
 * - password
 * properties:
 * _id:
 * type: string
 * description: ID autogenerado por MongoDB.
 * first_name:
 * type: string
 * description: Nombre del usuario.
 * last_name:
 * type: string
 * description: Apellido del usuario.
 * email:
 * type: string
 * description: Email del usuario.
 * role:
 * type: string
 * description: Rol del usuario (user o admin).
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