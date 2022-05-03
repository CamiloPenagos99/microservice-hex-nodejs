export const guardarPinError = {
    codigo_recogida: 12,
    id_llamada: 34,
    remitente: 'Cordi Util',
    telefono_remitente: '2671890',
    correo_remitente: 'coordi@gmail.com',
    envio_data: true,
    guias: [],
};

export const guardarPinOk = {
    codigo_recogida: 12,
    id_llamada: 34,
    remitente: 'Cordi Util',
    telefono_remitente: '2671890',
    nit_remitente: '1010',
    correo_remitente: 'coordi@gmail.com',
    envio_data: true,
    guias: [
        {
            codigo_remision: '73940048072',
            destinatario: 'Daniel Villa',
            correo_destinatario: 'danielv@coordinadora.com',
            telefono_destinatario: '',
            token: '48231',
            url_relacion_digital: 'prueba',
        },
        {
            codigo_remision: '12345678912',
            destinatario: 'Camilo Penagos',
            correo_destinatario: 'camilo.penagos@coordinadora.com',
            telefono_destinatario: '3182443322',
            token: '12123',
            url_relacion_digital: 'https://prueba/guia/suite.com',
        },
    ],
};
