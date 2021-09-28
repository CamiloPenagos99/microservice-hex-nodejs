import Joi from 'joi';

export const guardarPinGuiaSchema = Joi.object({
    codigo_recogida: Joi.number().allow(null, '', 0).min(0).optional(),
    id_llamada: Joi.number().allow(null, '', 0).min(0).optional(),
    remitente: Joi.string().allow(null, '', 0).min(0).optional(),
    telefono_remitente: Joi.string().allow(null, '', 0).min(0).optional(),
    correo_remitente: Joi.string().allow(null, '', 0).min(0).optional(),
    envio_data: Joi.bool().optional(),
    guias: Joi.array()
        .items(
            Joi.object({
                codigo_remision: Joi.string().allow(null, '', 0).min(0).optional(),
                destinatario: Joi.string().allow(null, '', 0).min(0).optional(),
                correo_destinatario: Joi.string().allow(null, '', 0).min(0).optional(),
                telefono_destinatario: Joi.string().allow(null, '', 0).min(0).optional(),
                token: Joi.string().allow(null, '', 0).min(0).optional(),
                url_relacion_digital: Joi.string().allow(null, '', 0).min(0).optional(),
            }),
        )
        .required()
        .min(1),
    actualizado: Joi.boolean().allow(null).optional(),
});
