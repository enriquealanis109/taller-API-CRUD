import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API MediCare",
    description: "Sistema de Gestion Hospitalaria - Taller integrador",
  },
  servers: [{ url: "http://localhost:3000" }],
};

const outputFile = "./swagger-output.json";
const routes = ["./src/app.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
