import express from "express";
import recetaRouter from "./routers/recetaRouter";

const app = express();
const PORT = 3000;

app.use(express.json());

//Ruta
app.get("/", (req, res) => {
  res.json({
    ok: true,
    mensaje: "MediCare funcionando",
  });
});

//Rutas de cada table
app.use("/api/recetas", recetaRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
