import { FastifyInstance } from 'fastify';
import {
    consultarFormaEnvio,
    consultarGuiaTracking,
    consultarPinGuia,
    guardarPinGuia,
    guardarPinGuiaPost,
    recuperarPinGuia,
    validarPinGuia,
} from './PinGuiaRouter';
import { consultaDataEnvio, recuperarPin, validarPin, validarPinGuiaSchema } from '../swagger/schemas';
import { guardarPinGuiasSwagger } from '../swagger/schemas/GuardarPinGuiaSchema';
import { guiasAgrupadas, guiasRemitente } from './GuiasAgrupadasRouter';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.post('/', guardarPinGuiasSwagger, guardarPinGuia);
    application.post('/pin-guia', guardarPinGuiaPost);
    application.post('/consultarPin', validarPin, consultarPinGuia);
    application.post('/validarPin', validarPinGuiaSchema, validarPinGuia);
    application.post('/recuperarPin', recuperarPin, recuperarPinGuia);
    application.post('/consultarFormaEnvio', consultaDataEnvio, consultarFormaEnvio);
    application.get('/guiasRemitente/:nit/:codigoRecogida', guiasRemitente);
    application.get('/guias', guiasAgrupadas);

    //nuevo endpoint
    application.get('/tracking-guia/:guia', consultarGuiaTracking);
};
