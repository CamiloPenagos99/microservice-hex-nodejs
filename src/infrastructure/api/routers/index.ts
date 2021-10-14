import { example } from './ExampleRouter';
import { FastifyInstance } from 'fastify';
import { consultarFormaEnvio, consultarPinGuia, guardarPinGuia, recuperarPinGuia } from './PinGuiaRouter';
import { consultaDataEnvio } from '../swagger/schemas';

export const initRoutes = (application: FastifyInstance): void => {
    application.get('/', example);
    application.post('/', guardarPinGuia);
    application.post('/consultarPin', consultarPinGuia);
    application.post('/recuperarPin', recuperarPinGuia);
    application.post('/consultarFormaEnvio', consultaDataEnvio, consultarFormaEnvio);
};
