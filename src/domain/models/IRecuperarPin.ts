import { IToken, tipoUsuarioGuia } from '@application/data';

export interface IRecuperarPin {
    remitente: string;
    telefono_remitente: string;
    correo_remitente: string;
    codigo_remision: string;
    destinatario: string;
    correo_destinatario: string;
    telefono_destinatario: string;
    token: IToken;
    tipo_usuario: tipoUsuarioGuia;
    medio_envio: string;
}
