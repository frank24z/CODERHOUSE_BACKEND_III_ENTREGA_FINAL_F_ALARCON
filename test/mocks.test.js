import supertest from 'supertest';
import app from '../src/app.js';
import { expect } from '@jest/globals';
import mongoose from 'mongoose';
import { connectDB } from '../src/db/database.js';


const request = supertest(app);


describe('Pruebas para el Router de Mocks', () => {

   
    beforeAll(async () => {
        await connectDB();
    });


    afterAll(async () => {
        await mongoose.connection.close();
    });


    it('Debe devolver 50 usuarios del endpoint GET /api/mocks/mockingusers', async () => {
        const response = await request.get('/api/mocks/mockingusers');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('payload');
        expect(response.body.payload).toBeInstanceOf(Array);
        expect(response.body.payload.length).toBe(50);
    });


    it('[POST] /api/mocks/generateData - Debe crear usuarios y mascotas', async () => {
        const counts = {
            users: 5,
            pets: 3
        };

        const response = await request.post('/api/mocks/generateData').send(counts);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe(`Se insertaron ${counts.users} usuarios y ${counts.pets} mascotas.`);
    });
});