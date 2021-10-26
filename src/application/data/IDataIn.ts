import { JsonObject } from 'swagger-ui-express';

export interface IDataIn {
    codigo_recogida: number;
    id_llamada: number;
    remitente: string;
    telefono_remitente: string;
    nit_remitente: string;
    correo_remitente: string;
    envio_data: boolean;
    guias: JsonObject[];
}
