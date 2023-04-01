import { Router } from 'express';
import { getSavedPrices, updatePrices } from '../controllers/prices';

const router = Router();

router.get('/', getSavedPrices);

router.patch('/', updatePrices);

export default router;