import { Receta } from "../interfaces/recetaInterface";

export const recetas: Receta[] = [
  {
    id: 1,
    citaId: 1,
    medicamentos: "Amoxicilina 500mg, Paracetamol 500mg",
    indicaciones: "Tomar cada 8 horas durante 7 días",
    fechaEmision: "2026-10-20",
  },
  {
    id: 2,
    citaId: 2,
    medicamentos: "Ibuprofeno 400mg",
    indicaciones: "Tomar cada 12 horas después de los alimentos por 5 días",
    fechaEmision: "2026-10-21",
  },
  {
    id: 3,
    citaId: 3,
    medicamentos: "Loratadina 10mg",
    indicaciones: "Tomar una tableta diaria por la mañana durante 10 días",
    fechaEmision: "2026-10-22",
  },
  {
    id: 4,
    citaId: 4,
    medicamentos: "Omeprazol 20mg, Metoclopramida 10mg",
    indicaciones:
      "Omeprazol en ayunas; metoclopramida 30 minutos antes de cada comida",
    fechaEmision: "2026-10-23",
  },
  {
    id: 5,
    citaId: 5,
    medicamentos: "Salbutamol inhalador 100mcg",
    indicaciones:
      "2 inhalaciones cada 6 horas en caso de dificultad respiratoria",
    fechaEmision: "2026-10-24",
  },
];
