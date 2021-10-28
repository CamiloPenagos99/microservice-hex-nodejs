/* eslint-disable prettier/prettier */
import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { Firestore } from '@google-cloud/firestore';
import { ConsultarEnvioEntity, GuiasRemitenteEntity, GuardarPinEntity, RecuperarPinEntity } from '@domain/entities';
import { TrackingRepository } from '@domain/repository';
import { ConsultarPinEntity } from '@domain/entities/ConsultarPinEntity';
import { FirestoreException, RepositoryException } from '@domain/exceptions';
import { JsonObject } from 'swagger-ui-express';

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
        } catch (e: any) {
            throw new FirestoreException(e.id, e.message);
        }
    }

    async consultarPin(data: ConsultarPinEntity): Promise<boolean> {
        const consulta = (await this.firestore.collection(this.collection).doc(data.guia).get()).data();
        console.log('=== consulta pin ===', consulta, consulta ? (consulta.token === data.pin ? true : false) : false);
        // consulta
        //     ? consulta.token.pin === data.pin || consulta.token === data.pin
        //         ? await this.firestore.collection(this.collection).doc().update({ contador: 1 })
        //         : 0
        //     : 0;
        return consulta ? (consulta.token.pin === data.pin || consulta.token === data.pin ? true : false) : false;
    }

    async consultarPinCont(data: ConsultarPinEntity): Promise<boolean> {
        const consulta = (await this.firestore.collection(this.collection).doc(data.guia).get()).data();
        console.log('=== consulta pin ===', consulta, consulta ? (consulta.token === data.pin ? true : false) : false);
        consulta
            ? consulta.token.pin !== data.pin || consulta.token !== data.pin
                ? await this.firestore.collection(this.collection).doc(data.guia).update({ contador: consulta.contador + 1})
                : 0
            : 0;
        return consulta ? (consulta.token.pin === data.pin || consulta.token === data.pin ? true : false) : false;
    }

    async recuperarPin(data: RecuperarPinEntity): Promise<any> {
        const consulta = (await this.firestore.collection(this.collection).doc(data.guia).get()).data();
        return consulta;
    }

    async recuperarDataEnvio(data: ConsultarEnvioEntity): Promise<any> {
        const consulta = (await this.firestore.collection(this.collection).doc(data.guia).get()).data();
        return consulta;
    }

    async consultarGuiasRemitente(data: GuiasRemitenteEntity): Promise<JsonObject> {
        let result: JsonObject | undefined = {};
        const query = await this.firestore
            .collection(this.collection)
            .where('nit_remitente', '==', data.nit)
            .where('codigo_recogida', '==', parseInt(data.codigoRecogida))
            .get();

        if (!query.size) {
            return result;
        }
        const res = query.docs.map((doc) => doc.data());
        result = res;
        return result;
    }
}
