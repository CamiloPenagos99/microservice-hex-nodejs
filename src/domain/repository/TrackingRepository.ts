import { IEnvioDataOut, IGuiaPinTracking, IRecuperarPinOut } from '@application/data';
import { ConsultarEnvioEntity } from '@domain/entities';
import { ConsultarPinEntity } from '@domain/entities/ConsultarPinEntity';
//import { GuardarPinEntity } from '@domain/entities/GuardarPinEntity';

export interface TrackingRepository {
    guardarPin(dataGuiaPin: IGuiaPinTracking): Promise<any>;
    consultarPin(dataPin: ConsultarPinEntity): Promise<boolean>;
    recuperarPin(guia: ConsultarEnvioEntity): Promise<IRecuperarPinOut>;
    recuperarDataEnvio(guia: ConsultarEnvioEntity): Promise<IEnvioDataOut>;
}
