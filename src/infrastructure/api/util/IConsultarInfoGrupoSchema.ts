import Joi from 'joi';

export const consultarInfoGrupoSchema = Joi.object({
    nit: Joi.string().required().label('El nit es obligatorio'),
    llamada: Joi.string().required().label('El id_llamada es obligatorio'),
});
