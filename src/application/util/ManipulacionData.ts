import { IDataEnvioPin, IDataIn, IEnvioDataOut, IGuiaPinTracking } from '@application/data';
import { IDataRecuperacionPinOut } from '@application/data/IDataRecuperacionPinOut';
import { IGuiaOut } from '@application/data/IGuiaOut';
import { IRecuperarPin } from '@domain/models';
import { TipoUsuario } from '@domain/models/ITipoUsuario';
import { JsonObject } from 'swagger-ui-express';
import { maskEmail, maskPhone } from './DataMask';

export const reconstruccionData = (guia: IGuiaOut, data: IDataIn): IGuiaPinTracking => {
    return {
        codigo_recogida: data.codigo_recogida,
        id_llamada: data.id_llamada,
        remitente: data.remitente,
        telefono_remitente: data.telefono_remitente,
        nit_remitente: data.nit_remitente,
        correo_remitente: data.correo_remitente,
        codigo_remision: guia.codigo_remision,
        destinatario: guia.destinatario,
        nit_destinatario: guia.nit_destinatario ?? 'NA',
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

export const dataRecuperarPinFormat = (guia: IGuiaPinTracking): IDataRecuperacionPinOut => {
    return {
        remitente: {
            telefono: maskPhone(guia.telefono_remitente),
            correo: maskEmail(guia.correo_remitente),
        },
        destinatario: {
            telefono: maskPhone(guia.telefono_destinatario),
            correo: maskEmail(guia.correo_destinatario),
        },
        codigo_remision: guia.codigo_remision,
    };
};

export const formatDataRecuperarPin = (guia: IGuiaPinTracking, data: IDataEnvioPin): IRecuperarPin => {
    return {
        codigo_remision: guia.codigo_remision,
        remitente: guia.remitente,
        telefono_remitente: guia.telefono_remitente,
        correo_remitente: guia.correo_remitente,
        destinatario: guia.telefono_destinatario,
        correo_destinatario: guia.correo_destinatario,
        telefono_destinatario: guia.telefono_destinatario,
        token: guia.token,
        tipo_usuario: data.tipoUsuario === 'remitente' ? TipoUsuario.REMITENTE : TipoUsuario.DESTINATARIO,
        medio_envio: data.medioEnvio,
    };
};
