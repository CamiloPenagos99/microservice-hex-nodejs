import { IGuiaPinIn } from '@application/data';

export class ConsultarPinEntity {
    readonly guia: string;
    readonly pin: string;

    constructor(data: IGuiaPinIn) {
        this.guia = data.guia;
        this.pin = data.pin;
    }

    static consultarPin(data: IGuiaPinIn): ConsultarPinEntity {
        return new ConsultarPinEntity(data);
    }
}
