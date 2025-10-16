import { Router } from 'express';
import Adoption from '../models/adoption.model.js';

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Lista todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       '200':
 *         description: Listado de adopciones.
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
 *                     $ref: '#/components/schemas/Adoption'
 *       '500':
 *         description: Error interno.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Crea una adopción
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [owner, pet]
 *             properties:
 *               owner:
 *                 type: string
 *                 description: ObjectId de User
 *                 example: 64f1c2a3b9d8f0123abc4567
 *               pet:
 *                 type: string
 *                 description: ObjectId de Pet
 *                 example: 64f1c2a3b9d8f0123abc4568
 *     responses:
 *       '201':
 *         description: Adopción creada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/Adoption'
 *       '400':
 *         description: Faltan datos requeridos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Error interno.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


const router = Router();

router.get('/', async (req, res) => {
    try {
        const adoptions = await Adoption.find();
        res.status(200).json({ status: 'success', payload: adoptions });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { owner, pet } = req.body;
    if (!owner || !pet) {
        return res.status(400).json({ status: 'error', message: 'Faltan datos (owner y pet son requeridos)' });
    }
    try {
        const newAdoption = await Adoption.create({ owner, pet });
        res.status(201).json({ status: 'success', payload: newAdoption });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;