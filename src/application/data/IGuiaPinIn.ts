export interface IGuiaPinIn {
    guia: string;
    pin: string;
    tipoUsuario: tipoUsuarioGuia;
}

export type tipoUsuarioGuia = 'remitente' | 'destinatario';
