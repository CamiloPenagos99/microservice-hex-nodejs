import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { Firestore } from '@google-cloud/firestore';
import { ConsultarEnvioEntity, GuardarPinEntity, RecuperarPinEntity } from '@domain/entities';
import { TrackingRepository } from '@domain/repository';
import { ConsultarPinEntity } from '@domain/entities/ConsultarPinEntity';
import { FirestoreException, RepositoryException } from '@domain/exceptions';

@injectable()
export class FirestoreTrackingRepository implements TrackingRepository {
    private firestore = DEPENDENCY_CONTAINER.get<Firestore>(TYPES.Firestore);
    private collection = 'guia-pin';

    async guardarPin(dataSave: GuardarPinEntity): Promise<any> {
        try {
            const ref = dataSave.codigo_remision;
            console.warn('id de referencia es', ref);
            const res = await this.firestore
                .collection(this.collection)
                .doc(ref)
                .set({ ...dataSave })
                .catch((err) => {
                    console.warn('error in database', err);
                    throw new RepositoryException();
                });
            return res;
        } catch (e) {
            throw new FirestoreException(e.id, e.message);
        }
    }

    async consultarPin(data: ConsultarPinEntity): Promise<boolean> {
        const consulta = (await this.firestore.collection(this.collection).doc(data.guia).get()).data();
        //console.log('=== consulta pin ===', consulta, consulta ? (consulta.token === data.pin ? true : false) : false);
        return consulta ? (consulta.token === data.pin ? true : false) : false;
    }

    async recuperarPin(data: RecuperarPinEntity): Promise<any> {
        const consulta = (await this.firestore.collection(this.collection).doc(data.guia).get()).data();
        return consulta;
    }

    async recuperarDataEnvio(data: ConsultarEnvioEntity): Promise<any> {
        const consulta = (await this.firestore.collection(this.collection).doc(data.guia).get()).data();
        return consulta;
    }
}
