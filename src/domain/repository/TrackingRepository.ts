import { IEnvioDataOut } from '@application/data';
import { ConsultarEnvioEntity, GuiasRemitenteEntity, RecuperarPinEntity } from '@domain/entities';
import { ConsultarPinEntity } from '@domain/entities/ConsultarPinEntity';
import { GuardarPinEntity } from '@domain/entities/GuardarPinEntity';
import { JsonObject } from 'swagger-ui-express';

export interface TrackingRepository {
    validarPinGuia(dataPin: ConsultarPinEntity): Promise<any>;
    reiniciarIntentosPin(dataPin: RecuperarPinEntity): Promise<boolean>;
    guardarPin(dataGuiaPin: GuardarPinEntity): Promise<string>;
    consultarPin(dataPin: ConsultarPinEntity): Promise<boolean>;
    recuperarPin(guia: RecuperarPinEntity): Promise<any>;
    recuperarDataEnvio(guia: ConsultarEnvioEntity): Promise<IEnvioDataOut>;
    consultarGuiasRemitente(data: GuiasRemitenteEntity): Promise<JsonObject>;
}
