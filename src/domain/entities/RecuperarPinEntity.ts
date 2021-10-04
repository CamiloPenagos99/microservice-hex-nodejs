import { IGuiaIn } from '@application/data';

export class RecuperarPinEntity {
    readonly guia: string;

    constructor(data: IGuiaIn) {
        this.guia = data.guia;
    }

    static recuperarPin(data: IGuiaIn): RecuperarPinEntity {
        return new RecuperarPinEntity(data);
    }
}