import Joi from 'joi';

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
    usuario: Joi.string()
        .optional()
        .length(1)
        .regex(/^[0-9]+$/),
});
