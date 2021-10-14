export const guardarPinGuiasSwagger = {
    schema: {
        description: 'Recupera la información para el envio del pin recuperado',
        tags: ['pubsub_topic: guardar-guia-pin'],
        body: {
            type: 'object',
            properties: {
                data: {
                    type: 'string',
                    example: 'Buffer Base64, de objeto interface IDataIn',
                    description: 'buffer Json base64',
                },
                publishTime: { type: 'string', example: '2021-09-20T15:03:27.824Z' },
                messageId: { type: 'string', description: 'id del mensaje GCP' },
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
