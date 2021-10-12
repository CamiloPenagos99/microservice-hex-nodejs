import { IDataEnvioIn } from '@application/data';

export class RecuperarPinEntity {
    readonly guia: string;
    readonly tipoUsuario: string;
    readonly medioEnvio: string;

    constructor(data: IDataEnvioIn) {
        this.guia = data.guia;
        this.tipoUsuario = data.tipoUsuario;
        this.medioEnvio = data.medioEnvio;
    }

    static crearEntidad(data: IDataEnvioIn): RecuperarPinEntity {
        return new RecuperarPinEntity(data);
    }
}
