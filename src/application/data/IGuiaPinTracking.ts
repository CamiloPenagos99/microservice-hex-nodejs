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
    correo_destinatario: string;
    telefono_destinatario: string;
    token?: string;
    url_relacion_digital?: string;
    actualizado?: boolean;
}
