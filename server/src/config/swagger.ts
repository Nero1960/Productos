// Importamos el módulo swagger-jsdoc que nos permite generar documentación Swagger a partir de comentarios en el código
import swaggerJSDoc from "swagger-jsdoc";

// Definimos las opciones para swagger-jsdoc
const options: swaggerJSDoc.Options = {
    // La configuración de swaggerDefinition contiene la definición general de la API
    swaggerDefinition: {
        // Especificamos la versión de OpenAPI que estamos utilizando
        openapi: '3.0.2',
        // Definimos las etiquetas (tags) que agrupamos las operaciones de la API
        tags: [
            {
                name: 'Products', // Nombre de la etiqueta
                description: 'API operations related to products' // Descripción de la etiqueta
            }
        ],
        // Información general sobre la API
        info: {
            title: 'REST API Node.js / Express / TS ', // Título de la API
            version: '1.0.0', // Versión de la API
            description: "API Docs for products" // Descripción de la API
        }
    },
    // Especificamos los archivos que contienen las rutas y que swagger-jsdoc debe analizar para generar la documentación
    apis: ['./src/routes.ts']
}

// Generamos la especificación de Swagger basada en las opciones definidas
const swaggerSpec = swaggerJSDoc(options);

// Exportamos la especificación de Swagger para que pueda ser utilizada en otros lugares de la aplicación
export default swaggerSpec;

