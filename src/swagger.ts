import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API DE LOS CONSULTORIOS",
    description:
      "Esta api tiene la informacion de los consultorios del hospital",
  },
  host: "localhost:3000",
  schemes: ["http"],
  // 🔑 AQUÍ DEFINIMOS EL HEADER DE AUTENTICACIÓN
  securityDefinitions: {
    ApiKeyAuth: {
      type: "apiKey",
      in: "header", // Le decimos que va en los Headers de la petición
      name: "x-api-key", // El nombre exacto que espera tu middleware
      description:
        "Introduce tu API Key para acceder a los endpoints protegidos (Ej: 123456789)",
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/index.ts"];

swaggerAutogen()(outputFile, routes, doc).then(async () => {
  console.log("documento JSON creado exitosamente");
});