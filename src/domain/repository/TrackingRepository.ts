import { IEnvioDataOut, IRecuperarPinOut } from '@application/data';
import { ConsultarEnvioEntity, GuiasRemitenteEntity } from '@domain/entities';
import { ConsultarPinEntity } from '@domain/entities/ConsultarPinEntity';
import { GuardarPinEntity } from '@domain/entities/GuardarPinEntity';
import { JsonObject } from 'swagger-ui-express';

export interface TrackingRepository {
    guardarPin(dataGuiaPin: GuardarPinEntity): Promise<string>;
    consultarPin(dataPin: ConsultarPinEntity): Promise<boolean>;
    recuperarPin(guia: ConsultarEnvioEntity): Promise<IRecuperarPinOut>;
    recuperarDataEnvio(guia: ConsultarEnvioEntity): Promise<IEnvioDataOut>;
    consultarGuiasRemitente(data: GuiasRemitenteEntity): Promise<JsonObject>;
}
