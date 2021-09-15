import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { Firestore } from '@google-cloud/firestore';
import { GuardarPinEntity } from '@domain/entities';
import { TrackingRepository } from '@domain/repository';

@injectable()
export class FirestoreTrackingRepository implements TrackingRepository {
    private firestore = DEPENDENCY_CONTAINER.get<Firestore>(TYPES.Firestore);
    private collection = 'guia-pin';

    async guardarPin(data: GuardarPinEntity): Promise<void> {
        console.log('===== llegue al dao ===', data);
        await this.firestore
            .collection(this.collection)
            .doc(data.codigo_remision)
            .set({ ...data });
    }
}
