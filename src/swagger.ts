import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API MediCare",
    description: "Sistema de Gestion Hospitalaria - Taller integrador",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const routes = ["./src/app.ts"];

swaggerAutogen()(outputFile, routes, doc);
