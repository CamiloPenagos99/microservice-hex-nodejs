import { IDataIn } from '@application/data';
import { JsonObject } from 'swagger-ui-express';

export class GuardarPinEntity {
    readonly codigo_recogida: number;
    readonly id_llamada: number;
    readonly remitente: string;
    readonly telefono_remitente: string;
    readonly correo_remitente: string;
    readonly envio_data: boolean;
    readonly guias: JsonObject[];

    constructor(data: IDataIn) {
        this.codigo_recogida = data.codigo_recogida;
        this.id_llamada = data.id_llamada;
        this.remitente = data.remitente;
        this.telefono_remitente = data.telefono_remitente;
        this.correo_remitente = data.correo_remitente;
        this.envio_data = data.envio_data;
        this.guias = data.guias;
    }

    static guardarPin(data: IDataIn): GuardarPinEntity {
        return new GuardarPinEntity(data);
    }
}
