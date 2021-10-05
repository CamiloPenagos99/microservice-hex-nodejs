import Joi from 'joi';

export const IDataEnvioSchema = Joi.object({
    guia: Joi.string()
        .length(11)
        .allow('')
        .regex(/^[0-9]+$/)
        .required()
        .label('El codigo de remision (guia), es obligatorio y de 11 caracteres'),
    tipoUsuario: Joi.string().valid('REMITENTE', 'DESTINATARIO').required().label('El tipo de usuario es obligatorio'),
});
