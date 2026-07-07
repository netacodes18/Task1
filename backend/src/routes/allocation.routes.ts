import { Router } from 'express';
import { runAllocation } from '../controllers/allocation.controller';

const router = Router();

router.post('/', runAllocation);

export default router;
