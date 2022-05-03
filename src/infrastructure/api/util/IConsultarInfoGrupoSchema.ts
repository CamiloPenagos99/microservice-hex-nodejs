import Joi from 'joi';

export const consultarInfoGrupoSchema = Joi.object({
    nit: Joi.string().required().label('El nit es obligatorio'),
    id_llamada: Joi.string().required().label('El id_llamada es obligatorio'),
    tipo: Joi.string().valid('REMITENTE', 'DESTINATARIO').required().label('El tipo de usuario, es obligatorio'),
});
