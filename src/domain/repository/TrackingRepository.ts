import { GuardarPinEntity } from '@domain/entities/GuardarPinEntity';

export interface TrackingRepository {
    guardarPin(dataGuiaPin: GuardarPinEntity): Promise<void>;
}
