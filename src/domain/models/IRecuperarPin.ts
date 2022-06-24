import { IToken } from '@application/data';
import { TipoUsuario } from './ITipoUsuario';

export interface IRecuperarPin {
    remitente: string;
    telefono_remitente: string;
    correo_remitente: string;
    codigo_remision: string;
    destinatario: string;
    correo_destinatario: string;
    telefono_destinatario: string;
    token: IToken;
    tipo_usuario: TipoUsuario;
    medio_envio: string;
    url_relacion_digital: string;
}
