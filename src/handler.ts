import serverless from 'serverless-http';
import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Inicializa dotenv
dotenv.config();

// Crea una instancia de Express
const app: Express = express();

// Importa las rutas
import apiRoutes from './routes/routes';

// Configura middlewares
app.use(express.json());
app.use(cors());

// Configura las rutas de la API
app.use("/api", apiRoutes);

// Exporta el handler para Serverless
export const handler = serverless(app);
