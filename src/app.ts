import express from "express";
import medicoRouter from "./routers/medico.router";
import recetaRouter from "./routers/recetaRouter";
import citaRouter from "./routers/cita.router";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = require("./swagger-output.json");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
  console.log(`Documentación: http://localhost:${PORT}/api-docs`);
});
