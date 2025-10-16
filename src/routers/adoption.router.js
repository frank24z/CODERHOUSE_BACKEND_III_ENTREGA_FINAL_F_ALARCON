import { Router } from 'express';
import Adoption from '../models/adoption.model.js';

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