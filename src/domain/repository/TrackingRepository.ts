import { IConsultaGuiasGrupoIn, IGuiaPinTracking, IToken } from '@application/data';
import { GuiasRemitenteEntity, RecuperarPinEntity } from '@domain/entities';
import { GuardarPinEntity } from '@domain/entities/GuardarPinEntity';
import { JsonObject } from 'swagger-ui-express';

export interface TrackingRepository {
    modificarIntentosPinGuia(guia: string, tokenModificado: IToken): Promise<void>;
    reiniciarIntentosPin(dataPin: RecuperarPinEntity): Promise<void>;
    guardarPin(dataGuiaPin: GuardarPinEntity): Promise<string>;
    consultarPin(dataPin: string): Promise<GuardarPinEntity>;
    recuperarPin(guia: RecuperarPinEntity): Promise<GuardarPinEntity>;
    consultarGuiasRemitente(data: GuiasRemitenteEntity): Promise<JsonObject>;
    consultarGuiasAgrupadas(data: IConsultaGuiasGrupoIn): Promise<IGuiaPinTracking[]>;
    consultarGuiaTracking(guia: string): Promise<any>;
}
