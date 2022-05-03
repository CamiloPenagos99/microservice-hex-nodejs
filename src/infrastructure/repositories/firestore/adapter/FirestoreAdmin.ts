import admin from 'firebase-admin';
import { GCP_PROJECT, URL_BASE_DATABASE } from '@util';

admin.initializeApp({
    databaseURL: URL_BASE_DATABASE,
    projectId: GCP_PROJECT,
    serviceAccountId: 'suite-apis@cm-cluster-coordinadora-prod.iam.gserviceaccount.com',
});

export const firebaseAdmin = admin;
