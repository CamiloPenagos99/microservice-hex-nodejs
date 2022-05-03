import { firebaseAdmin } from '@infrastructure/repositories/firestore/adapter/FirestoreAdmin';

export const getToken = async (payload: string): Promise<string> => {
    // const uid = v1();
    try {
        const token = await firebaseAdmin.auth().createCustomToken(payload);
        return token;
    } catch (e) {
        console.error('error generar pin', e.message);
    }

    return '';
};
