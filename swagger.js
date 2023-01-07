// see https://www.npmjs.com/package/swagger-autogen for more info

const dotEnv = require("dotenv");
dotEnv.config({ path: "./config/config.env" });
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './config/swagger.json'
const endpointsFiles = ['./app.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "",
        description: ""
    },
    host: process.env.HOSTNAME+":"+process.env.PORT,
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        { "name": "Security", },
    ],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            in: "header",
            name: "auth"
        },
    },
    definitions: {
        login: {
            user: "",
            password: "",
        },
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc);