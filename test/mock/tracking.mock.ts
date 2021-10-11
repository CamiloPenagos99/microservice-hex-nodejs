import { MEDIO_ENVIO_CORREO, MEDIO_ENVIO_SMS, USUARIO_DESTINATARIO, USUARIO_REMITENTE } from '@util';

export const dataInput = {
    codigo_recogida: 12,
    id_llamada: 34,
    remitente: 'Daniel Alejandro Villa',
    telefono_remitente: '',
    correo_remitente: 'villa1992@gmail.com',
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
    ],
};

export const consultarPinFallido = {
    guia: '73940048072',
    pin: '123451',
};

export const consultarPinOK = {
    guia: '73940048072',
    pin: '12347',
};

export const consultarPinGuiaInexistente = {
    guia: '00000000000',
    pin: '12347',
};

export const consultarPinErrado = {
    guia: '73940048072',
    pin: '17891',
};

export const recuperarFormaEnvioOk = {
    guia: '73940048072',
    tipoUsuario: USUARIO_REMITENTE,
};

export const recuperarFormaEnvioInexistente = {
    guia: '73940048073',
    tipoUsuario: USUARIO_REMITENTE,
};

export const recuperarFormaEnvioF = {
    guia: '739400480721',
    tipoUsuario: USUARIO_DESTINATARIO,
};

export const recuperarPinOk = {
    guia: '73940048072',
    tipoUsuario: USUARIO_DESTINATARIO,
    medioEnvio: MEDIO_ENVIO_CORREO,
};

export const recuperarPinF = {
    guia: '73940048072',
    tipoUsuario: USUARIO_DESTINATARIO,
    medioEnvio: 'llamada',
};

export const recuperarPinGuiaInexistente = {
    guia: '00000000000',
    tipoUsuario: USUARIO_DESTINATARIO,
    medioEnvio: MEDIO_ENVIO_SMS,
};
