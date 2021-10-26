import Joi from 'joi';

export const guardarPinGuiaSchema = Joi.object({
    codigo_recogida: Joi.number().allow(null, '', 0).min(0).optional(),
    id_llamada: Joi.number().allow(null, '', 0).min(0).optional(),
    remitente: Joi.string().allow(null, '', 0).min(0).optional(),
    telefono_remitente: Joi.string().allow(null, '', 0).min(0).optional(),
    correo_remitente: Joi.string().allow(null, '', 0).min(0).optional(),
    nit_remitente: Joi.string().allow(null, '', 0).min(0).optional(),
    envio_data: Joi.bool().optional(),
    guias: Joi.array()
        .items(
            Joi.object({
                codigo_remision: Joi.string()
                    .length(11)
                    .allow('')
                    .regex(/^[0-9]+$/)
                    .required()
                    .label('El codigo de remision (guia), es obligatorio y de 11 caracteres'),
                destinatario: Joi.string().allow(null, '', 0).min(0).optional(),
                correo_destinatario: Joi.string().allow(null, '', 0).min(0).optional(),
                telefono_destinatario: Joi.string().allow(null, '', 0).min(0).optional(),
                token: Joi.object({
                    pin: Joi.string()
                        .required()
                        .length(5)
                        .regex(/^[0-9]+$/),
                    remitente: Joi.number().optional(),
                    destinatario: Joi.number().optional(),
                }),

                url_relacion_digital: Joi.string().allow(null, '', 0).min(0).optional(),
                recuperado: Joi.boolean().allow(null).optional(),
            }),
        )
        .required()
        .min(1),
});
