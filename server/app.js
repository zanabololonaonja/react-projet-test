import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employee.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Déclaration de la route de base de votre API
app.use('/api/employees', employeeRoutes);

export default app;