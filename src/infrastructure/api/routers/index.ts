import { FastifyInstance } from 'fastify';
import {
    consultarFormaEnvio,
    consultarGuiaToken,
    guardarPinGuia,
    recuperarPinGuia,
    validarPinGuia,
} from './PinGuiaRouter';
import { consultaDataEnvio, recuperarPin, validarPinGuiaSchema } from '../swagger/schemas';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.post('/pin-guia', guardarPinGuia);
    application.post('/validarPin', validarPinGuiaSchema, validarPinGuia);
    application.post('/recuperarPin', recuperarPin, recuperarPinGuia);
    application.post('/consultarFormaEnvio', consultaDataEnvio, consultarFormaEnvio);

    //nuevo endpoint
    application.get('/guia/:guia', consultarGuiaToken);
};
