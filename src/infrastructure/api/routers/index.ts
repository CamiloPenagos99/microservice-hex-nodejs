import { example } from './ExampleRouter';
import { FastifyInstance } from 'fastify';
import { consultarPinGuia, guardarPinGuia } from './PinGuiaRouter';

export const initRoutes = (application: FastifyInstance): void => {
    application.get('/', example);
    application.post('/', guardarPinGuia);
    application.post('/consultarPin', consultarPinGuia);
};
