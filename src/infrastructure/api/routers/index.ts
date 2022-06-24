import { FastifyInstance } from 'fastify';
import {
    consultarFormaEnvio,
    consultarGuiaTracking,
    guardarPinGuia,
    recuperarPinGuia,
    validarPinGuia,
} from './PinGuiaRouter';
import { consultaDataEnvio, recuperarPin, validarPinGuiaSchema } from '../swagger/schemas';
import { guiasAgrupadas, guiasRemitente } from './GuiasAgrupadasRouter';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.post('/pin-guia', guardarPinGuia);
    application.post('/validarPin', validarPinGuiaSchema, validarPinGuia);
    application.post('/recuperarPin', recuperarPin, recuperarPinGuia);
    application.post('/consultarFormaEnvio', consultaDataEnvio, consultarFormaEnvio);
    application.get('/guiasRemitente/:nit/:codigoRecogida', guiasRemitente);
    application.get('/guias', guiasAgrupadas);

    //nuevo endpoint
    application.get('/tracking-guia/:guia', consultarGuiaTracking);
};
