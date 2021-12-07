import { IDataIn, IToken } from '@application/data';
import { IGuiaOut } from '@application/data/IGuiaOut';
//import { JsonObject } from 'swagger-ui-express';

export class GuardarGuiaTriggerEntity implements IDataIn {
    readonly codigo_recogida: number;
    readonly id_llamada: number;
    readonly remitente: string;
    readonly telefono_remitente: string;
    readonly correo_remitente: string;
    readonly nit_remitente: string;
    readonly envio_data: boolean;
    readonly token?: IToken;
    readonly url_relacion_digital?: string;
    readonly guias: IGuiaOut[];

    constructor(data: IDataIn) {
        this.codigo_recogida = data.codigo_recogida;
        this.id_llamada = data.id_llamada;
        this.remitente = data.remitente;
        this.telefono_remitente = data.telefono_remitente;
        this.correo_remitente = data.correo_remitente;
        this.nit_remitente = data.nit_remitente;
        this.envio_data = data.envio_data;
        this.guias = data.guias;
    }

    static crearEntidad(data: IDataIn): GuardarGuiaTriggerEntity {
        return new GuardarGuiaTriggerEntity(data);
    }
}
