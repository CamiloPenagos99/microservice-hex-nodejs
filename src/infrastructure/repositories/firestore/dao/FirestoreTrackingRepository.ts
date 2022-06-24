import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { Firestore } from '@google-cloud/firestore';
import { GuardarPinEntity, RecuperarPinEntity } from '@domain/entities';
import { TrackingRepository } from '@domain/repository';
import { FirestoreException, RepositoryException } from '@domain/exceptions';
import { USUARIO_REMITENTE } from '@util';
import { IGuiaPinTracking, IToken } from '@application/data';

@injectable()
export class FirestoreTrackingRepository implements TrackingRepository {
    private firestore = DEPENDENCY_CONTAINER.get<Firestore>(TYPES.Firestore);
    private collection = 'guia-pin';

    async guardarPin(data: GuardarPinEntity): Promise<string> {
        try {
            const ref = data.codigo_remision;
            console.log('registrando pin para ', ref);
            await this.firestore
                .collection(this.collection)
                .doc(ref)
                .set({ ...data });
            return ref;
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
