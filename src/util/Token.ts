import { firebaseAdmin } from '@infrastructure/repositories/firestore/adapter/FirestoreAdmin';

export const getToken = async (payload: string): Promise<string> => {
    // const uid = v1();
    const token = await firebaseAdmin.auth().createCustomToken(payload);
    return token;
};
