import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';

// Extender el tipo Request para incluir el usuario
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    // El token debe venir en el header: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token no proporcionado' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.userId = decoded.userId // Guardamos el userId para usarlo en controllers
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token invalido' });
    }
};