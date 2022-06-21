import Joi from 'joi';
import { USUARIO_DESTINATARIO, USUARIO_REMITENTE } from '@util';

export const consultarPinGuiaSchema = Joi.object({
    guia: Joi.string()
        .length(11)
        .allow('')
        .regex(/^[0-9]+$/)
        .required()
        .label('El codigo de remision (guia), es obligatorio y de 11 caracteres'),
    pin: Joi.string()
        .required()
        .length(5)
        .regex(/^[0-9]+$/),
    tipoUsuario: Joi.string()
        .valid(USUARIO_REMITENTE, USUARIO_DESTINATARIO)
        .required()
        .label('El tipo de usuario es obligatorio'),
});
