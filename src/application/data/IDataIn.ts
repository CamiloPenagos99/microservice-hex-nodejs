import { IGuiaOut } from './IGuiaOut';

export interface IDataIn {
    codigo_recogida: number;
    id_llamada: number;
    remitente: string;
    telefono_remitente: string;
    nit_remitente: string;
    correo_remitente: string;
    guias: IGuiaOut[];
}
