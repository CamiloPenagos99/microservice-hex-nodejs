import { IGuiaPinIn } from '@application/data';

export class ConsultarPinEntity {
    readonly guia: string;
    readonly pin: string;
    readonly tipoUsuario: string;

    constructor(data: IGuiaPinIn) {
        this.guia = data.guia;
        this.pin = data.pin;
        this.tipoUsuario = data.tipoUsuario;
    }

    static crearEntidad(data: IGuiaPinIn): ConsultarPinEntity {
        return new ConsultarPinEntity(data);
    }
}
