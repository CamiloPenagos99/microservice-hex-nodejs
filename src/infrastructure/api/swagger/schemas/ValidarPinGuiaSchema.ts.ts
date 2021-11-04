export const validarPinGuiaSchema = {
    schema: {
        description: 'Recupera la información para el envio del pin recuperado',
        tags: ['consultar-pin'],
        body: {
            type: 'object',
            properties: {
                guia: {
                    type: 'string',
                    example: '03640311736',
                    description: 'codigo de remision de la guia',
                },
                pin: {
                    type: 'string',
                    example: '12345',
                    description: 'pin de seguridad de la guia',
                },
                tipoUsuario: {
                    type: 'string',
                    example: 'destinatario',
                    enum: ['remitente', 'destinatario'],
                    description: 'tipo de usuario',
                },
            },
        },
        response: {
            '200-ok': {
                description: 'Respuesta satisfactoria',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            pinValido: {
                                type: 'object',
                                properties: {
                                    pinValidado: {
                                        type: 'boolean',
                                        example: 'true',
                                        description: 'flag de validacion para el pin',
                                    },
                                    tipoUsuario: {
                                        type: 'string',
                                        example: 'remitente',
                                        description: 'Tipo de usuario en la guia',
                                    },
                                    intentos: {
                                        type: 'number',
                                        example: '1',
                                        description: 'Cantidad de intentos fallidos para el pin',
                                    },
                                },
                                example: { pinValidado: true, tipoUsuario: 'remitente', intentos: 0 },
                            },
                            bearer: {
                                type: 'string',
                                description: 'JWT de autenticacion',
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
