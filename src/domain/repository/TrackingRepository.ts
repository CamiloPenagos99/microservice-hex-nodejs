import { ConsultarPinEntity } from '@domain/entities/ConsultarPinEntity';
import { GuardarPinEntity } from '@domain/entities/GuardarPinEntity';

export interface TrackingRepository {
    guardarPin(dataGuiaPin: GuardarPinEntity): Promise<void>;
    consultarPin(dataPin: ConsultarPinEntity): Promise<boolean>;
}
