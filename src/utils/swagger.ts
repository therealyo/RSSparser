import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';


const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "rss-parser",
            version: "1.0.0",
            host: "http://18.134.182.196",
            basePath: "http://18.134.182.196"
        }  
    },
    apis: ['./src/controllers/*', './src/dtos/*', './src/database/*']
}

export const swaggerSpec= swaggerJSDoc(options)
