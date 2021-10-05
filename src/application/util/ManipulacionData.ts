import { IDataIn, IGuiaPinTracking } from '@application/data';
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
        actualizado: guia.actualizado,
    };
};
