import { IConsultaGuiasRtteIn } from '@application/data';

export class GuiasRemitenteEntity {
    readonly nit: string;
    readonly codigoRecogida: string;

    constructor(data: IConsultaGuiasRtteIn) {
        this.nit = data.nit;
        this.codigoRecogida = data.codigoRecogida;
    }

    static crearEntidad(data: IConsultaGuiasRtteIn): GuiasRemitenteEntity {
        return new GuiasRemitenteEntity(data);
    }
}
