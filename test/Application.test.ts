import { application } from '@infrastructure/api/Application';
import { Firestore } from '@google-cloud/firestore';
import MockFirebase from 'mock-cloud-firestore';
import { TYPES, DEPENDENCY_CONTAINER, createDependencyContainer } from '@configuration';
import {
    consultarPinFallido,
    consultarPinOK,
    recuperarFormaEnvioF,
    recuperarFormaEnvioOk,
    recuperarPinF,
    recuperarPinOk,
} from './mock/tracking.mock';
import { FIRESTORE_DATA } from './mock/Firestore.mock';
import { guardarPinError } from './mock/BufferData.mock';
import { randomBytes } from 'crypto';

const MockFirestore = new MockFirebase(FIRESTORE_DATA);
const firestore = MockFirestore.firestore();

describe('Testeo del microservicio, dominio tracking pin guia', () => {
    beforeAll(() => {
        createDependencyContainer();
        DEPENDENCY_CONTAINER.rebind<Firestore>(TYPES.Firestore).toConstantValue(firestore);
    });

    it('acceso ruta inexistente', async () => {
        const response = await application.inject({
            method: 'GET',
            url: '/route-not-found',
        });
        expect(response.statusCode).toBe(404);
    });

    it('acceso a la ruta principal del microservicio', async () => {
        const response = await application.inject({
            method: 'GET',
            url: '/',
        });
        expect(response.statusCode).toBe(200);
    });

    it('test fallido para consultar pin', async () => {
        const response = await application.inject({
            method: 'POST',
            url: '/consultarPin',
            payload: consultarPinFallido,
        });
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body).isError).toBeTruthy();
    });

    it('test correcto, para consultar pin', async () => {
        const response = await application.inject({
            method: 'POST',
            url: '/consultarPin',
            payload: consultarPinOK,
        });
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).isError).toBeFalsy();
    });

    it('test fallido para guardar pin', async () => {
        const response = await application.inject({
            method: 'POST',
            url: '/consultarFormaEnvio',
            payload: {
                message: {
                    data: Buffer.from(JSON.stringify(guardarPinError)).toString('base64'),
                    publishTime: new Date(),
                    messageId: randomBytes(16).toString('hex'),
                },
            },
        });
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body).isError).toBeTruthy();
    });

    it('test exitoso para consulta forma de envio', async () => {
        const response = await application.inject({
            method: 'POST',
            url: '/consultarFormaEnvio',
            payload: recuperarFormaEnvioOk,
        });
        expect(response.statusCode).toBe(200);
    });

    it('test fallido para consulta forma de envio', async () => {
        const response = await application.inject({
            method: 'POST',
            url: '/consultarFormaEnvio',
            payload: recuperarFormaEnvioF,
        });
        expect(response.statusCode).toBe(400);
    });

    //recuperar pin

    it('test fallido para recuperar pin', async () => {
        const response = await application.inject({
            method: 'POST',
            url: '/recuperarPin',
            payload: recuperarPinF,
        });
        expect(response.statusCode).toBe(400);
    });

    it('test exitoso para recuperar pin', async () => {
        const response = await application.inject({
            method: 'POST',
            url: '/recuperarPin',
            payload: recuperarPinOk,
        });
        expect(response.statusCode).toBe(200);
    });
});
