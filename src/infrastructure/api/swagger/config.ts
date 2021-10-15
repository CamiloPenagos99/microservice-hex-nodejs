import { URL_BASE } from '@util';
import { FastifyDynamicSwaggerOptions } from 'fastify-swagger';

export const swagger_config: FastifyDynamicSwaggerOptions = {
    routePrefix: `/docs`,
    swagger: {
        info: {
            title: 'Microservicio - Tracking - Consulta Pin',
            description:
                'Este Microservice se encarga de gestionar, almacenar y recuperar el pin de seguridad de la suite',
            version: '0.1.0',
            contact: {
                name: 'Coordinadora Mercantil S.A',
                url: 'http://www.coordinadora.com/',
                email: 'it@coordinadora.com',
            },
        },
        host: URL_BASE,
        schemes: [URL_BASE.includes('local') ? 'http' : 'https'],
        //schemes: ['https'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
    hideUntagged: true,
};
