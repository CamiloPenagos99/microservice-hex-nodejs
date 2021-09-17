import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { Firestore } from '@google-cloud/firestore';
import { GuardarPinEntity } from '@domain/entities';
import { TrackingRepository } from '@domain/repository';
import { ConsultarPinEntity } from '@domain/entities/ConsultarPinEntity';

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

    async consultarPin(data: ConsultarPinEntity): Promise<boolean> {
        const consulta = (await this.firestore.collection(this.collection).doc(data.guia).get()).data();
        console.log('=== consulta pin ===', consulta, consulta ? (consulta.token === data.pin ? true : false) : false);
        return consulta ? (consulta.token === data.pin ? true : false) : false;
    }
}
