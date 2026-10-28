import express from 'express';
import medicoRouter from './routers/medico.router';

const app = express();
const PORT = 3000;

// Middleware para entender JSON
app.use(express.json());

// Registrar tus rutas de médicos
app.use('/medicos', medicoRouter);

// Ruta de inicio
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Hospitalaria MediCare activa y lista' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;