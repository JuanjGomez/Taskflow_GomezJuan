import { Request, Response, NextFunction } from 'express';

export const errorHandler = {
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
} => {
    console.error('Error:', error);

    // Errores especificos de Prisma
    if (err.code === 'P2002') {
        res.status(400).json({ error: 'Ya existe un registro con esos datos' });
        return;
    }

    // Errores de validacion
    if (err.name === 'ValidationError') {
        res.status(400).json({ error: err.message });
        return;
    }

    // Error por defecto
    res.status(500).json({
        error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor'
    });
};