//Pacientes
import express from 'express';
import pacientesRouter from './routers/pacientesRouters';

import express from 'express';
import medicoRouter from './routers/medico.router';
import recetaRouter from "./routers/recetaRouter";
import citaRouter from "./routers/cita.router";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/pacientes', pacientesRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;

app.use("/api/citas", citaRouter);

//Ruta
app.get("/", (req, res) => {
  res.json({
    ok: true,
    mensaje: "MediCare funcionando",
  });
});

//Rutas de cada table
app.use("/api/recetas", recetaRouter);
app.use("/api/medicos", medicoRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
