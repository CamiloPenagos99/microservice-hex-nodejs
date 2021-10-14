export const consultaDataEnvio = {
    schema: {
        description: 'Recupera la información para el envio del pin recuperado',
        tags: ['consultar-envio-pin'],
        body: {
            type: 'object',
            properties: {
                guia: {
                    type: 'string',
                    example: '03640311736',
                    description: 'codigo de remision de la guia',
                },
            },
        },
        response: {
            '200-ok': {
                description: 'Respuesta satisfactoria',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: true },
                    data: {
                        type: 'object',
                        properties: {
                            remitente: {
                                type: 'object',
                                properties: {
                                    telefono: { type: 'string' },
                                    correo: { type: 'string' },
                                },
                            },
                            destinatario: {
                                type: 'object',
                                properties: {
                                    telefono: { type: 'string' },
                                    correo: { type: 'string' },
                                },
                            },
                            codigo_remision: {
                                type: 'string',
                            },
                        },
                    },
                    timestamp: { type: 'string', example: '2021-09-20T15:03:27.824Z' },
                    id: { type: 'string', description: 'id del request' },
                },
            },
        },
    },
};
