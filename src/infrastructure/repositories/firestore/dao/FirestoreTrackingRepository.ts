/* eslint-disable prettier/prettier */
import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { Firestore } from '@google-cloud/firestore';
import {
    ConsultarEnvioEntity,
    GuiasRemitenteEntity,
    GuardarPinEntity,
    RecuperarPinEntity,
    GuardarGuiaTriggerEntity,
} from '@domain/entities';
import { TrackingRepository } from '@domain/repository';
import { ConsultarPinEntity } from '@domain/entities/ConsultarPinEntity';
import { FirestoreException, RepositoryException } from '@domain/exceptions';
import { JsonObject } from 'swagger-ui-express';
import { USUARIO_REMITENTE } from '@util';
import { IConsultaGuiasGrupoIn, IGuiaPinTracking, tipoUsuario } from '@application/data';

@injectable()
export class FirestoreTrackingRepository implements TrackingRepository {
    private firestore = DEPENDENCY_CONTAINER.get<Firestore>(TYPES.Firestore);
    private collection = 'guia-pin';
    private collectionTrigger = 'guia-pin-notificacion';

    async guardarPin(data: GuardarPinEntity): Promise<any> {
        try {
            const ref = data.codigo_remision;
            console.log('registrando pin para ', ref);
            const res = await this.firestore
                .collection(this.collection)
                .doc(ref)
                .set({ ...data })
                .catch((err) => {
                    console.error('error in database tracking', err);
                    throw new RepositoryException();
                });
            return res;
        } catch (e: any) {
            console.error('error registrando pin de guia ', data.codigo_remision, e.message);
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

    async validarPinGuia(data: ConsultarPinEntity): Promise<any> {
        const consulta = (await this.firestore.collection(this.collection).doc(data.guia).get()).data();
        if (!consulta) return false;
        try {
            console.log('objeto de base de datos', consulta);
            let pinCorrecto = false;
            const rolUsuario = data.tipoUsuario;
            const pinUser = data.pin;
            const pinGuia = consulta.token.pin;
            if (!pinGuia) throw new FirestoreException(9, 'Objeto Token invalido para la guia');
            const retorno = { pinValidado: false, tipoUsuario: '', intentos: -1 };
            let contador = consulta.token[rolUsuario];

            //logica
            if (contador >= 3) {
                retorno.pinValidado = false;
                retorno.tipoUsuario = rolUsuario;
                //retorno.intentos=update.token[rolUsuario]
                retorno.intentos = contador;
                return retorno;
            }

            if (pinUser === pinGuia) {
                pinCorrecto = true;
                const resetIntentos =
                    rolUsuario === USUARIO_REMITENTE
                        ? { remitente: 0, destinatario: consulta.token.destinatario, pin: consulta.token.pin }
                        : { remitente: consulta.token.remitente, destinatario: 0, pin: consulta.token.pin };
                (await this.firestore
                    .collection(this.collection)
                    .doc(data.guia)
                    .update({ token: resetIntentos })) as JsonObject;

                retorno.pinValidado = pinCorrecto;
                retorno.tipoUsuario = rolUsuario;
                //retorno.intentos=update.token[rolUsuario]
                retorno.intentos = 0;
            } else {
                contador++;
                pinCorrecto = false;
                const sumarIntentos =
                    rolUsuario === USUARIO_REMITENTE
                        ? { remitente: contador, destinatario: consulta.token.destinatario, pin: consulta.token.pin }
                        : { remitente: consulta.token.remitente, destinatario: contador, pin: consulta.token.pin };
                (await this.firestore
                    .collection(this.collection)
                    .doc(data.guia)
                    .update({ token: sumarIntentos })) as JsonObject;

                retorno.pinValidado = pinCorrecto;
                retorno.tipoUsuario = rolUsuario;
                //retorno.intentos=update.token[rolUsuario]
                retorno.intentos = contador;
            }

            console.log('respuesta validar pin: ', retorno);
            return retorno;
        } catch (e) {
            console.log('error en el formato de guia', e);
            throw new FirestoreException(9, 'Error base de datos: ' + e.message);
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

    async recuperarDataEnvio(data: ConsultarEnvioEntity): Promise<any> {
        const consulta = (await this.firestore.collection(this.collection).doc(data.guia).get()).data();
        return consulta;
    }

    async reiniciarIntentosPin(data: RecuperarPinEntity): Promise<void> {
        const doc = await this.firestore.collection(this.collection).doc(data.guia).get();
        if (!doc.exists) {
            console.error(`No existe registro para la guia ${data.guia}`);
            throw new FirestoreException(0, `No existe registro, para la guia: ${data.guia}`);
        }
        const ref = doc.data() as GuardarPinEntity;
        const rolUsuario = data.tipoUsuario;
        const pinGuia = ref.token.pin;
        const resetIntentos =
            rolUsuario === USUARIO_REMITENTE
                ? { remitente: 0, destinatario: ref.token.destinatario, pin: pinGuia }
                : { remitente: ref.token.remitente, destinatario: 0, pin: pinGuia };
        (await this.firestore
            .collection(this.collection)
            .doc(data.guia)
            .update({ token: resetIntentos })) as JsonObject;
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

    async guardarTrigger(data: GuardarGuiaTriggerEntity): Promise<string> {
        try {
            const ref = data.nit_remitente;
            console.warn('Nit de referencia es', ref);
            const { id } = await this.firestore
                .collection(this.collectionTrigger)
                .add({ ...data })
                .catch((err) => {
                    console.warn('error in database', err);
                    throw new RepositoryException();
                });
            return id;
        } catch (e: any) {
            throw new FirestoreException(e.id, e.message);
        }
    }
}
