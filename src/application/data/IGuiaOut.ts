import { IToken } from '.';

export interface IGuiaOut {
    codigo_remision: string;
    destinatario: string;
    correo_destinatario: string;
    telefono_destinatario: string;
    token?: IToken;
    url_relacion_digital?: string;
    tipoUsuario?: string;
    medioEnvio?: string;
    recuperado?: boolean;
}
