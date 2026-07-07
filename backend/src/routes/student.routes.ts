import { Router } from 'express';
import { registerStudent, getStudents } from '../controllers/student.controller';

const router = Router();

router.post('/', registerStudent);
router.get('/', getStudents);

export default router;
