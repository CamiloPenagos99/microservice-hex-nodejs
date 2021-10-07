import Joi from 'joi';
import { MEDIO_ENVIO_CORREO, MEDIO_ENVIO_WP, USUARIO_DESTINATARIO, USUARIO_REMITENTE } from '@util';

export const IDataEnvioSchema = Joi.object({
    guia: Joi.string()
        .length(11)
        .allow('')
        .regex(/^[0-9]+$/)
        .required()
        .label('El codigo de remision (guia), es obligatorio y de 11 caracteres'),
    tipoUsuario: Joi.string()
        .valid(USUARIO_REMITENTE, USUARIO_DESTINATARIO)
        .required()
        .label('El tipo de usuario es obligatorio'),
    medioEnvio: Joi.string()
        .valid(MEDIO_ENVIO_CORREO, MEDIO_ENVIO_WP)
        .optional()
        .label('El medio de envio es obligatorio'),
});
