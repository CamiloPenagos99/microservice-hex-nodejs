export const guardarPinGuiasSwagger = {
    schema: {
        description: 'Recupera la información para el envio del pin recuperado',
        tags: ['pubsub_topic: guardar-guia-pin'],
        body: {
            type: 'object',
            properties: {
                message: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'string',
                            example: {
                                codigo_recogida: 12,
                                id_llamada: 34,
                                remitente: 'Exito',
                                telefono_remitente: '2671790',
                                correo_remitente: 'ventas@exito.com',
                                nit_remitente: '123456789',
                                envio_data: true,
                                guias: [
                                    {
                                        codigo_remision: '88888888888',
                                        destinatario: 'Jaime Larrondo',
                                        correo_destinatario: 'jlr@coordinadora.com',
                                        telefono_destinatario: '3166407819',
                                        token: '48231',
                                        url_relacion_digital: 'prueba',
                                    },
                                    {
                                        codigo_remision: '33333333333',
                                        destinatario: 'Camilop',
                                        correo_destinatario: 'camilo.penagos@coordinadora.com',
                                        telefono_destinatario: '3182443322',
                                        token: '12123',
                                        url_relacion_digital: 'https://prueba/guia/suite.com',
                                    },
                                ],
                            },
                            description: 'buffer Json base64',
                        },
                        publishTime: { type: 'string', example: '2021-09-20T15:03:27.824Z' },
                        messageId: { type: 'string', description: 'id del mensaje GCP' },
                    },
                },
            },
        },
        response: {
            '200-OK': {
                description: 'Respuesta satisfactoria',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false, description: 'confirmacion del exito de la operacion' },
                    data: {
                        type: 'string',
                        example: 'Se guardo en base de datos, 2 registros',
                        description: 'mensaje de confirmación de los registros guardados',
                    },
                    timestamp: { type: 'string', example: '2021-09-20T15:03:27.824Z' },
                },
            },
        },
    },
};
