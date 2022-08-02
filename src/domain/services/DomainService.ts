import { IDataEnvioPin, IDataGuiaPinTracking, IGuiaPinIn, IGuiaPinTracking, IToken } from '@application/data';
import { PinValidadoGuia } from '@domain/models';

export const controlIntentosAcceso = (data: IGuiaPinIn, guiaPin: IGuiaPinTracking, token: string): PinValidadoGuia => {
    const tipoUsuario = data.tipoUsuario;
    const intentos = guiaPin.token[tipoUsuario].intentos;
    const validacion = {} as PinValidadoGuia;

    if (intentos >= 3) {
        validacion.pinValido = false;
        validacion.tipoUsuario = tipoUsuario;
        validacion.intentos = intentos;
        validacion.bearer = null;
        return validacion;
    }
    const pinGuia = guiaPin.token[tipoUsuario].pin;
    validacion.tipoUsuario = tipoUsuario;
    const pinUsuario = data.pin;
    if (pinGuia === pinUsuario) {
        validacion.pinValido = true;
        validacion.intentos = 0;
        validacion.bearer = token;
    } else {
        validacion.pinValido = false;
        validacion.intentos = intentos + 1;
        validacion.bearer = null;
    }

    return validacion;
};

export const modificarIntentosPinGuia = (validacion: PinValidadoGuia, guiaPin: IGuiaPinTracking): IToken => {
    const nuevoToken = guiaPin.token;
    const tipoUsuario = validacion.tipoUsuario;
    nuevoToken[tipoUsuario].intentos = validacion.intentos;

    return nuevoToken;
};

export const reiniciarIntentosPinGuia = (data: IDataEnvioPin, guiaPin: IGuiaPinTracking): IToken => {
    const nuevoToken = guiaPin.token;
    const tipoUsuario = data.tipoUsuario;
    nuevoToken[tipoUsuario].intentos = 0;

    return nuevoToken;
};

export const dataGuiaPin = (guiaPin: IGuiaPinTracking): IDataGuiaPinTracking => {
    const { codigo_remision, token, url_relacion_digital } = guiaPin;
    return { codigo_remision, token, url_relacion_digital };
};
