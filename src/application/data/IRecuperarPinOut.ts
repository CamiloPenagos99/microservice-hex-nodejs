import { IGuiaOut } from './IGuiaOut';
export interface IRecuperarPinOut {
    codigo_recogida: number;
    id_llamada: number;
    remitente: string;
    telefono_remitente: string;
    correo_remitente: string;
    envio_data: boolean;
    guias: [IGuiaOut];
}
