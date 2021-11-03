import { example } from './ExampleRouter';
import { FastifyInstance } from 'fastify';
import {
    consultarFormaEnvio,
    consultarPinGuia,
    consultarPinGuiaCont,
    guardarPinGuia,
    recuperarPinGuia,
    validarPinGuia,
} from './PinGuiaRouter';
import { consultaDataEnvio, recuperarPin, validarPin } from '../swagger/schemas';
import { guardarPinGuiasSwagger } from '../swagger/schemas/GuardarPinGuiaSchema';
import { guiasRemitente } from './GuiasRemitenteRouter';

export const initRoutes = (application: FastifyInstance): void => {
    application.get('/', example);
    application.post('/', guardarPinGuiasSwagger, guardarPinGuia);
    application.post('/consultarPin', validarPin, consultarPinGuia);
    application.post('/consultarPinCont', validarPin, consultarPinGuiaCont);
    application.post('/validarPin', validarPin, validarPinGuia);
    application.post('/recuperarPin', recuperarPin, recuperarPinGuia);
    application.post('/consultarFormaEnvio', consultaDataEnvio, consultarFormaEnvio);
    application.get('/guiasRemitente/:nit/:codigoRecogida', guiasRemitente);
};
