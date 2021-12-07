import { example } from './ExampleRouter';
import { FastifyInstance } from 'fastify';
import {
    consultarFormaEnvio,
    consultarPinGuia,
    guardarPinGuia,
    guardarTrigger,
    recuperarPinGuia,
    validarPinGuia,
} from './PinGuiaRouter';
import { consultaDataEnvio, recuperarPin, validarPin, validarPinGuiaSchema } from '../swagger/schemas';
import { guardarPinGuiasSwagger } from '../swagger/schemas/GuardarPinGuiaSchema';
import { guiasRemitente } from './GuiasRemitenteRouter';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.get('/', example);
    application.post('/', guardarPinGuiasSwagger, guardarPinGuia);
    application.post('/consultarPin', validarPin, consultarPinGuia);
    application.post('/validarPin', validarPinGuiaSchema, validarPinGuia);
    application.post('/recuperarPin', recuperarPin, recuperarPinGuia);
    application.post('/consultarFormaEnvio', consultaDataEnvio, consultarFormaEnvio);
    application.get('/guiasRemitente/:nit/:codigoRecogida', guiasRemitente);

    //nuevo endpoint
    application.post('/trigger', guardarTrigger);
};
