import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { Firestore } from '@google-cloud/firestore';
import { ConsultarEnvioEntity, RecuperarPinEntity } from '@domain/entities';
import { TrackingRepository } from '@domain/repository';
import { ConsultarPinEntity } from '@domain/entities/ConsultarPinEntity';
import { IGuiaPinTracking } from '@application/data';

@injectable()
export class FirestoreTrackingRepository implements TrackingRepository {
    private firestore = DEPENDENCY_CONTAINER.get<Firestore>(TYPES.Firestore);
    private collection = 'guia-pin';

    async guardarPin(payload: IGuiaPinTracking): Promise<any> {
        //const plain = JSON.parse(JSON.stringify(data));
        const result = await this.firestore
            .collection(this.collection)
            .doc(payload.codigo_remision)
            .set({ ...payload });
        console.log('guardando....', result);
        return result;
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
