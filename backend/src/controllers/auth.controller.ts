import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../services/prisma.service';
import { generateToken } from '../utils/jwt.utils';

// REGISTRO
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validacion basica
        if (!email || !password) {
            res.status(400).json({ error: 'Email y contraseña son requeridos' });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
            return;
        }

        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            res.status(400).json({ error: 'El email ya esta registrado' });
            return;
        }

        // Hash de contraseña (10 rounds es el estandar)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const user = await prisma.user.create({
            data: {
                email,
                hashedPassword
            }
        });

        // Generar token
        const token = generateToken(user.id);

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            token,
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        console.error('Error en register:', error)
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email y contraseña son requeridas' });
            return;
        }

        // Buscar usuario
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            res.status(401).json({ error: 'Credenciales invalidas' });
            return;
        }

        // Comparar hashes
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            res.status(401).json({ error: 'Credenciales invalidas' });
            return;
        }

        // Generar token
        const token = generateToken(user.id);

        res.json({
            message: 'Login exitoso',
            token,
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        console.error('Error en login', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};