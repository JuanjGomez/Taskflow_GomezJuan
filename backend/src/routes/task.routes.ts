import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller';

const router = Router();

// Todas las rutas de tareas requieren autenticacion
router.use(authenticate);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id' updateTask);
router.delete('/:id', deleteTask);

export default router;