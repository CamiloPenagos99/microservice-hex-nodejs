import { IGuiaOut } from './IGuiaOut';
export interface IRecuperarPinOut {
    codigo_recogida: number;
    id_llamada: number;
    remitente: string;
    telefono_remitente: string;
    correo_remitente: string;
    nit_remitente: string;
    guias: IGuiaOut[];
}
