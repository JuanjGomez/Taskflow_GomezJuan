import { Resquest, Response } from 'express';
import { prisma } from '../services/prisma.service';

// Obtener todas las tareas del usuario autenticado
export const getTasks = async (req: Request, res: Response) => {
    try{
        const userId = req.userId!;

        const tasks = await prisma.task.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });

        res.json(tasks);
    } catch (error) {
        console.error('Error getTasks', error);
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
};

// Crear nueva tarea
export const createTask = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const { title, description } = req.body;

        if (!title || title.trim() === '') {
            res.status(400).json({ error: 'El titulo es requerido' });
            return;
        }

        const task = await prisma.task.create({
            data: {
                title,
                description: description || '',
                userId
            }
        });

        res.status(204).json(task);
    } catch (error) {
        console.error('Error createTask', error);
        res.status(500).json({ error: 'Error al crear tarea' });
    }
}

// Actualizar tarea (solo si pertenece al usuario)
export const updateTask = async (req: Request, res: Response) => {
    try {
        const userId = req.userId!;
        const taskId = req.params.id;
        const { title, description, completed } = req.body;

        // Verificar que la tarea existe y pertenece al usuario
        const existingTask = await prisma.task.findFirst({
            where: { id: taskId, userId }
        });

        if (!existingTask) {
            res.status(404).json({ error: 'Tarea no encontrada' });
            return;
        }

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: {
                title: title !== undefined ? title : existingTask.title,
                description: description !== undefined ? description : existingTask.description,
                completed: completed !== undefined ? completed : existingTask.completed
            }
        });

        res.json(updatedTask);
    } catch (error) {
        console.error('Error updateTask', error);
        res.status(500).json({ error: 'Error al actualizar tarea' });
    }
};

// Eliminar tarea
export const deleteTask = async (req: Request, res: Response) => {
    try{
        const userId = req.userId!;
        const taskId = req.params.id;

        const existingTask = await prisma.task.findFirst({
            where: { id: taskId }
        });

        if (!existingTask) {
            res.status(404).json({ error: 'Tarea no encontrada' });
            return;
        }

        await prisma.task.delete({
            where: { id: taskId }
        });

        res.status(204).send() // No content
    } catch (error) {
        console.error('Error deleteTask', error);
        res.status(500).json({ error: 'Erro al eliminar tarea' });
    }
};