import admin from 'firebase-admin';
import { GCP_PROJECT } from '@util';

admin.initializeApp({
    databaseURL: 'https://console.firebase.google.com/u/1/project/cm-api-tracking-dev/firestore/data/~2F',
    projectId: GCP_PROJECT,
    serviceAccountId: 'suite-apis@cm-cluster-coordinadora-prod.iam.gserviceaccount.com',
});

export const firebaseAdmin = admin;
