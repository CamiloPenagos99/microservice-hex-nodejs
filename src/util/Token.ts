import { FirestoreException } from '@domain/exceptions';
import { firebaseAdmin } from '@infrastructure/repositories/firestore/adapter/FirestoreAdmin';

export const signToken = async (payload: string): Promise<string> => {
    try {
        const token = await firebaseAdmin.auth().createCustomToken(payload);
        return token;
    } catch (e) {
        console.error('error al firmar token', e.message);
        throw new FirestoreException(9, 'Error al firmar el JWT de acceso');
    }
};
