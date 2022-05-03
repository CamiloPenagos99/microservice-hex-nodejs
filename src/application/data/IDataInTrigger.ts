import { IGuiaOut } from './IGuiaOut';

export interface IDataInTrigger {
    codigo_recogida: number;
    id_llamada: number;
    remitente: string;
    telefono_remitente: string;
    nit_remitente: string;
    nit_cliente: string;
    div_cliente: string;
    correo_remitente: string;
    envio_data: boolean;
    guias: IGuiaOut[];
}
