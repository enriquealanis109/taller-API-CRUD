import express from "express";
import pacientesRouter from "./routers/pacientesRouters";
import medicoRouter from "./routers/medico.router";
import citaRouter from "./routers/cita.router";
import recetaRouter from "./routers/recetaRouter";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = require("./swagger-output.json");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Ruta
app.get("/", (req, res) => {
  res.json({
    ok: true,
    mensaje: "MediCare funcionando",
  });
});

//Rutas de cada tabla
app.use("/api/pacientes", pacientesRouter);
app.use("/api/medicos", medicoRouter);
app.use("/api/citas", citaRouter);
app.use("/api/recetas", recetaRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación: http://localhost:${PORT}/api-docs`);
});