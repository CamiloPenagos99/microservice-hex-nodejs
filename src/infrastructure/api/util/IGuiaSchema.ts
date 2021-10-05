import Joi from 'joi';

export const IGuiaSchema = Joi.object({
    guia: Joi.string().allow(null, '').min(0).optional(),
});
