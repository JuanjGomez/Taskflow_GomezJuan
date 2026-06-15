import { Routes } from 'express';
import { register, login } from 'express';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;