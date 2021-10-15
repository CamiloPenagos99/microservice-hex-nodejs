import { IDataEnvioIn, IDataIn, IEnvioDataOut, IGuiaPinTracking, IRecuperarPinOut } from '@application/data';
import { IEnvioDataOutComplete } from '@application/data/IEnvioDataOutComplete';
import { JsonObject } from 'swagger-ui-express';

export const reconstruccionData = (guia: JsonObject, data: IDataIn): IGuiaPinTracking => {
    return {
        codigo_recogida: data.codigo_recogida,
        id_llamada: data.id_llamada,
        remitente: data.remitente,
        telefono_remitente: data.telefono_remitente,
        correo_remitente: data.correo_remitente,
        envio_data: data.envio_data,
        codigo_remision: guia.codigo_remision,
        destinatario: guia.destinatario,
        correo_destinatario: guia.correo_destinatario,
        telefono_destinatario: guia.telefono_destinatario,
        token: guia.token,
        url_relacion_digital: guia.url_relacion_digital,
    };
};

export const dataRecuperarPinRemitente = (guia: JsonObject): IEnvioDataOut => {
    return {
        telefono_remitente: guia.telefono_remitente,
        correo_remitente: guia.correo_remitente,
        codigo_remision: guia.codigo_remision,
    };
};

export const dataRecuperarPinDestinatario = (guia: JsonObject): IEnvioDataOut => {
    return {
        telefono_destinatario: guia.telefono_destinatario,
        correo_destinatario: guia.correo_destinatario,
        codigo_remision: guia.codigo_remision,
    };
};

export const dataRecuperarPinCompleto = (guia: JsonObject): IEnvioDataOutComplete => {
    return {
        remitente: {
            telefono: guia.telefono_remitente,
            correo: guia.correo_remitente,
        },
        destinatario: {
            telefono: guia.telefono_destinatario,
            correo: guia.correo_destinatario,
        },
        codigo_remision: guia.codigo_remision,
    };
};

export const dataRecuperarPinSalida = (guia: JsonObject, metadata: IDataEnvioIn): IRecuperarPinOut => {
    return {
        codigo_recogida: guia.codigo_recogida,
        id_llamada: guia.id_llamada,
        remitente: guia.remitente,
        telefono_remitente: guia.telefono_remitente,
        correo_remitente: guia.correo_remitente,
        envio_data: guia.envio_data,
        guias: [
            {
                codigo_remision: guia.codigo_remision,
                destinatario: guia.destinatario,
                correo_destinatario: guia.correo_destinatario,
                telefono_destinatario: guia.telefono_destinatario,
                token: guia.token,
                url_relacion_digital: guia.url_relacion_digital,
                tipoUsuario: metadata.tipoUsuario,
                medioEnvio: metadata.medioEnvio,
                recuperado: true,
            },
        ],
    };
};
