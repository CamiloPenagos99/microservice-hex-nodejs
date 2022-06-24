import { tipoUsuarioGuia } from '@application/data';

export interface PinValidadoGuia {
    pinValido: boolean;
    tipoUsuario: tipoUsuarioGuia;
    intentos: number;
    bearer: string | null;
}
