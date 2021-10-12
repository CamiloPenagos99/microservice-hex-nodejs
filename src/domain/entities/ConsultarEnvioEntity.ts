import { IGuiaIn } from '@application/data';

export class ConsultarEnvioEntity {
    readonly guia: string;

    constructor(data: IGuiaIn) {
        this.guia = data.guia;
    }

    static crearEntidad(data: IGuiaIn): ConsultarEnvioEntity {
        return new ConsultarEnvioEntity(data);
    }
}
