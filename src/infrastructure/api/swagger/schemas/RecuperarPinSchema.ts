export const recuperarPin = {
    schema: {
        description: 'Recupera la información para el envio del pin recuperado',
        tags: ['recuperar-pin'],
        body: {
            type: 'object',
            properties: {
                guia: {
                    type: 'string',
                    example: '03640311736',
                    description: 'codigo de remision de la guia',
                },
                tipoUsuario: {
                    type: 'string',
                    example: 'remitente',
                    description: 'tipo de usuario: remitente-destinatario',
                },
                medioEnvio: {
                    type: 'string',
                    example: '17-09-2021',
                    description: 'medio de envio: whatsapp, sms, correo',
                },
            },
        },
        response: {
            '200-OK': {
                description: 'Respuesta satisfactoria',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: { type: 'string', description: 'mensaje de confirmación del envio' },
                    timestamp: { type: 'string', example: '2021-09-20T15:03:27.824Z' },
                    id: { type: 'string', description: 'id del request' },
                },
            },
        },
    },
};
