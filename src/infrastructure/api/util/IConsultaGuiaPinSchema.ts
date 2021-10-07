import Joi from 'joi';

export const consultarPinGuiaSchema = Joi.object({
    guia: Joi.string().allow(null, '', 0).min(0).optional(),
    pin: Joi.string().allow(null, '', 0).min(0).optional(),
});
