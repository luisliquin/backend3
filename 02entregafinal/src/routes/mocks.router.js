import express from 'express';
import { generateMockPets, generateMockUsers, generateData } from '../controllers/mock.controller.js';

const router = express.Router();

router.get('/mockingpets', generateMockPets);
router.get('/mockingusers', generateMockUsers);
router.post('/generateData', generateData);

export default router;