import supertest from 'supertest';
import app from '../src/app.js';
import { expect } from '@jest/globals';
import mongoose from 'mongoose';
import { connectDB } from '../src/db/database.js';
import Adoption from '../src/models/adoption.model.js';

const request = supertest(app);

describe('Pruebas para el Router de Adopción', () => {

    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await Adoption.deleteMany({});
        await mongoose.connection.close();
    });

    it('[POST] /api/adoptions - Debe crear una nueva adopción correctamente (caso de éxito)', async () => {
        const newAdoption = {
            owner: '64f1c2a3b9d8f0123abc4567', //EJEMPLO DE ID
            pet: '64f1c2a3b9d8f0123abc4568'   //EJEMPLO DE ID
        };

        const response = await request.post('/api/adoptions').send(newAdoption);

        expect(response.status).toBe(201);
        expect(response.body.payload).toHaveProperty('_id');
        expect(response.body.payload.owner).toBe(newAdoption.owner);
    });

    it('[POST] /api/adoptions - Debe fallar si faltan datos (caso de error)', async () => {
        const incompleteAdoption = {
            owner: '64f1c2a3b9d8f0123abc4567' 
        };

        const response = await request.post('/api/adoptions').send(incompleteAdoption);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Faltan datos (owner y pet son requeridos)');
    });

    it('[GET] /api/adoptions - Debe devolver un listado de adopciones', async () => {

        await Adoption.create({ owner: 'Test', pet: 'TestPet' });

        const response = await request.get('/api/adoptions');

        expect(response.status).toBe(200);
        expect(response.body.payload).toBeInstanceOf(Array);
        expect(response.body.payload.length).toBeGreaterThan(0); 
    });
});