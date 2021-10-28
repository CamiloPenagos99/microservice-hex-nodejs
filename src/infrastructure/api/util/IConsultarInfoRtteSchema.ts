import Joi from 'joi';

export const consultarInfoRtteSchema = Joi.object({
    nit: Joi.string().required().label('El nit es obligatorio'),
    codigoRecogida: Joi.string().required().label('El codigo_recogida es obligatorio'),
});
