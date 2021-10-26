import { IGuiaPinTracking } from '@application/data';

export class GuardarPinEntity {
    readonly codigo_recogida: number;
    readonly id_llamada: number;
    readonly remitente: string;
    readonly telefono_remitente: string;
    readonly correo_remitente: string;
    readonly nit_remitente: string;
    readonly envio_data: boolean;
    readonly codigo_remision: string;
    readonly correo_destinatario: string;
    readonly destinatario: string;
    readonly telefono_destinatario: string;
    readonly token?: string;
    readonly url_relacion_digital?: string;

    constructor(data: IGuiaPinTracking) {
        this.codigo_recogida = data.codigo_recogida;
        this.id_llamada = data.id_llamada;
        this.remitente = data.remitente;
        this.telefono_remitente = data.telefono_remitente;
        this.correo_remitente = data.correo_remitente;
        this.nit_remitente = data.nit_remitente;
        this.envio_data = data.envio_data;
        this.codigo_remision = data.codigo_remision;
        this.correo_destinatario = data.correo_destinatario;
        this.destinatario = data.destinatario;
        this.telefono_destinatario = data.telefono_destinatario;
        this.token = data.token;
        this.url_relacion_digital = data.url_relacion_digital;
    }

    static crearEntidad(data: IGuiaPinTracking): GuardarPinEntity {
        return new GuardarPinEntity(data);
    }
}
