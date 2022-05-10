import { IToken } from '.';

export interface IGuiaPinTracking {
    codigo_recogida: number;
    id_llamada: number;
    remitente: string;
    telefono_remitente: string;
    nit_remitente: string;
    correo_remitente: string;
    envio_data: boolean;
    codigo_remision: string;
    destinatario: string;
    nit_destinatario: string;
    correo_destinatario: string;
    telefono_destinatario: string;
    token: IToken;
    url_relacion_digital?: string;
    actualizado?: boolean;
}
