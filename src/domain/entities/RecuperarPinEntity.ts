import { IDataEnvioPin } from '@application/data';

export class RecuperarPinEntity {
    readonly guia: string;
    readonly tipoUsuario: string;
    readonly medioEnvio: string;

    constructor(data: IDataEnvioPin) {
        this.guia = data.guia;
        this.tipoUsuario = data.tipoUsuario;
        this.medioEnvio = data.medioEnvio;
    }

    static crearEntidad(data: IDataEnvioPin): RecuperarPinEntity {
        return new RecuperarPinEntity(data);
    }
}
