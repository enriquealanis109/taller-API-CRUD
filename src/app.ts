//Pacientes
import express from 'express';
import pacientesRouter from './routers/pacientesRouters';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/pacientes', pacientesRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
