export interface IConsultaGuiasGrupoIn {
    nit: string;
    id_llamada: string;
    tipo: tipoUsuario;
}

export enum tipoUsuario {
    REMITENTE = 'REMITENTE',
    DESTINATARIO = 'DESTINATARIO',
}
