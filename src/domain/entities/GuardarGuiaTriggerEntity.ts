import { IDataIn, IToken } from '@application/data';
import { IDataInTrigger } from '@application/data/IDataInTrigger';
import { IGuiaOut } from '@application/data/IGuiaOut';
//import { JsonObject } from 'swagger-ui-express';

export class GuardarGuiaTriggerEntity implements IDataInTrigger {
    readonly codigo_recogida: number;
    readonly id_llamada: number;
    readonly remitente: string;
    readonly telefono_remitente: string;
    readonly correo_remitente: string;
    readonly nit_remitente: string;
    readonly nit_cliente: string;
    readonly div_cliente: string;
    readonly envio_data: boolean;
    readonly token?: IToken;
    readonly url_relacion_digital?: string;
    readonly guias: IGuiaOut[];

    constructor(data: IDataInTrigger) {
        this.codigo_recogida = data.codigo_recogida;
        this.id_llamada = data.id_llamada;
        this.remitente = data.remitente;
        this.telefono_remitente = data.telefono_remitente;
        this.correo_remitente = data.correo_remitente;
        this.nit_remitente = data.nit_remitente;
        this.envio_data = data.envio_data;
        this.guias = data.guias;
        this.nit_cliente = data.nit_cliente;
        this.div_cliente = data.div_cliente;
    }

    static crearEntidad(data: IDataInTrigger): GuardarGuiaTriggerEntity {
        return new GuardarGuiaTriggerEntity(data);
    }
}
