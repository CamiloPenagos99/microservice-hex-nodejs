import { FastifyDynamicSwaggerOptions } from 'fastify-swagger';

export const swagger_config: FastifyDynamicSwaggerOptions = {
    routePrefix: `/docs`,
    swagger: {
        info: {
            title: 'Microservicio - Tracking - Gestionar Pin',
            description:
                'Este Microservice se encarga de gestionar, almacenar y recuperar el pin de seguridad de la suite',
            version: '0.1.0',
            contact: {
                name: 'Coordinadora Mercantil S.A',
                url: 'http://www.coordinadora.com/',
                email: 'it@coordinadora.com',
            },
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
    hideUntagged: true,
};
