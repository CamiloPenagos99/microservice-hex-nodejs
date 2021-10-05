import { IDataEnvioIn } from '@application/data';

export class ConsultarEnvioEntity {
    readonly guia: string;
    readonly tipoUsuario: string;

    constructor(data: IDataEnvioIn) {
        this.guia = data.guia;
        this.tipoUsuario = data.guia;
    }

    static consultarDataEnvio(data: IDataEnvioIn): ConsultarEnvioEntity {
        return new ConsultarEnvioEntity(data);
    }
}
