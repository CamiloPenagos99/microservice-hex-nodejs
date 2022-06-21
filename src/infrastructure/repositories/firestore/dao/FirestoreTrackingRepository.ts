import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { Firestore } from '@google-cloud/firestore';
import { GuiasRemitenteEntity, GuardarPinEntity, RecuperarPinEntity } from '@domain/entities';
import { TrackingRepository } from '@domain/repository';
import { FirestoreException, RepositoryException } from '@domain/exceptions';
import { JsonObject } from 'swagger-ui-express';
import { USUARIO_REMITENTE } from '@util';
import { IConsultaGuiasGrupoIn, IGuiaPinTracking, IToken, tipoUsuario } from '@application/data';

@injectable()
export class FirestoreTrackingRepository implements TrackingRepository {
    private firestore = DEPENDENCY_CONTAINER.get<Firestore>(TYPES.Firestore);
    private collection = 'guia-pin';

    async guardarPin(data: GuardarPinEntity): Promise<any> {
        try {
            const ref = data.codigo_remision;
            console.log('registrando pin para ', ref);
            const res = await this.firestore
                .collection(this.collection)
                .doc(ref)
                .set({ ...data });
            return res;
        } catch ({ code, message }) {
            console.error(`Error al registrar pin para guía ${data.codigo_remision}`);
            throw new FirestoreException(code as number | string, message as string);
        }
    }

    async consultarPin(guia: string): Promise<IGuiaPinTracking> {
        try {
            const ref = await this.firestore.collection(this.collection).doc(guia).get();
            if (!ref.exists) {
                throw new FirestoreException(0, `No se encontro registro del pin, para la guía ${guia}`);
            }
            const guiaPin = ref.data() as IGuiaPinTracking;
            console.log(`consulta pin guia ${guia}`);
            return guiaPin;
        } catch ({ statusCode, cause, message }) {
            console.error(`error al consultar pin guia ${guia}`);
            throw new RepositoryException(`${message}`, statusCode as number, cause as string);
        }
    }

    async modificarIntentosPinGuia(guia: string, tokenModificado: IToken): Promise<void> {
        try {
            await this.firestore.collection(this.collection).doc(guia).update({ token: tokenModificado });
        } catch ({ code, message }) {
            console.error(`Error al modificar intentos de pin guia ${guia}`);
            throw new FirestoreException(code as number | string, message as string);
        }
    }

    async recuperarPin(data: RecuperarPinEntity): Promise<GuardarPinEntity> {
        try {
            const doc = await this.firestore.collection(this.collection).doc(data.guia).get();
            if (!doc.exists) {
                console.error(`No existe registro para la guia ${data.guia}`);
                throw new FirestoreException(0, `No existe registro, para la guia: ${data.guia}`);
            } else {
                const pinGuia = doc.data() as GuardarPinEntity;
                return pinGuia;
            }
        } catch ({ code, message }) {
            console.error(`Error en el proceso de recuperacion de pin-guia ${data.guia}`);
            throw new FirestoreException(code as number | string, message as string);
        }
    }

    async reiniciarIntentosPin(data: RecuperarPinEntity): Promise<void> {
        const doc = await this.firestore.collection(this.collection).doc(data.guia).get();
        if (!doc.exists) {
            console.error(`No existe registro para la guia ${data.guia}`);
            throw new FirestoreException(0, `No existe registro, para la guia: ${data.guia}`);
        }
        const ref = doc.data() as GuardarPinEntity;
        const rolUsuario = data.tipoUsuario;
        const guiaToken = ref.token;
        const resetRemitente = {
            remitente: { intentos: 0, pin: guiaToken.remitente.pin },
            destinatario: { intentos: guiaToken.destinatario.intentos, pin: guiaToken.destinatario.pin },
        };
        const resetDestinatario = {
            remitente: { intentos: 0, pin: guiaToken.remitente.pin },
            destinatario: { intentos: guiaToken.destinatario.intentos, pin: guiaToken.destinatario.pin },
        };
        const resetIntentos: IToken = rolUsuario === USUARIO_REMITENTE ? resetRemitente : resetDestinatario;
        await this.firestore.collection(this.collection).doc(data.guia).update({ token: resetIntentos });
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

    async consultarGuiasAgrupadas(data: IConsultaGuiasGrupoIn): Promise<IGuiaPinTracking[]> {
        const filter = data.tipo === tipoUsuario.REMITENTE ? 'nit_remitente' : 'nit_destinatario';
        const query = await this.firestore
            .collection(this.collection)
            .where(filter, '==', data.nit)
            .where('id_llamada', '==', parseInt(data.id_llamada))
            .get();

        if (!query.size || query.docs.length === 0) {
            throw new FirestoreException('0', `No se encuentran las guias para el nit: ${data.nit}`);
        }
        const guias = query.docs.map((doc) => doc.data() as IGuiaPinTracking);

        return guias;
    }

    async consultarGuiaTracking(guia: string): Promise<any> {
        try {
            console.log('consultango guia tracking de ', guia);
            const ref = await this.firestore.collection('Tracking').doc(guia).get();
            if (!ref.exists) {
                throw new FirestoreException(0, `No se encontro el tracking de la guia ${guia}`);
            }
            const tracking = ref.data();
            return tracking;
        } catch (e: any) {
            console.error(`error en el tracking de la guia ${guia}`, e.message);
            throw new FirestoreException(e.id, e.message);
        }
    }
}
