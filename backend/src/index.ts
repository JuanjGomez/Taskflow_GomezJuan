import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE GLOBABLES (orden IMPORTANTE)
app.use(helmet());                          // Seguridad: Oculta cabeceras
app.use(cors());                            // Permite peticiones desde frontend
app.use(express.json());                    // Parsear JSON del body
app.use(morgan('dev'));                     // Logs detallados para debugging

// RUTAS
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Ruta de prueba (health check)
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Manejo de errores (SIEMPRE AL FINAL)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});