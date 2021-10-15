import { example } from './ExampleRouter';
import { FastifyInstance } from 'fastify';
import { consultarFormaEnvio, consultarPinGuia, guardarPinGuia, recuperarPinGuia } from './PinGuiaRouter';
import { consultaDataEnvio, recuperarPin, validarPin } from '../swagger/schemas';
import { guardarPinGuiasSwagger } from '../swagger/schemas/GuardarPinGuiaSchema';

export const initRoutes = (application: FastifyInstance): void => {
    application.get('/', example);
    application.post('/', guardarPinGuiasSwagger, guardarPinGuia);
    application.post('/consultarPin', validarPin, consultarPinGuia);
    application.post('/recuperarPin', recuperarPin, recuperarPinGuia);
    application.post('/consultarFormaEnvio', consultaDataEnvio, consultarFormaEnvio);
};
