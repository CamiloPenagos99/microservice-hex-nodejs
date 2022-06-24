import { IGuiaPinTracking, IToken } from '@application/data';
import { RecuperarPinEntity } from '@domain/entities';
import { GuardarPinEntity } from '@domain/entities/GuardarPinEntity';

export interface TrackingRepository {
    modificarIntentosPinGuia(guia: string, tokenModificado: IToken): Promise<void>;
    reiniciarIntentosPin(dataPin: RecuperarPinEntity): Promise<void>;
    guardarPin(dataGuiaPin: GuardarPinEntity): Promise<string>;
    consultarPin(dataPin: string): Promise<IGuiaPinTracking>;
    recuperarPin(guia: RecuperarPinEntity): Promise<GuardarPinEntity>;
    consultarGuiaTracking(guia: string): Promise<any>;
}
