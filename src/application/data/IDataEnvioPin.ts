import { tipoUsuarioGuia } from './IGuiaPinIn';

export interface IDataEnvioPin {
    guia: string;
    tipoUsuario: tipoUsuarioGuia;
    medioEnvio: string;
}
