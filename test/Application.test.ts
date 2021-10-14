import 'reflect-metadata';
import { application } from '@infrastructure/api/Application';
import { Firestore } from '@google-cloud/firestore';
import MockFirebase from 'mock-cloud-firestore';
import { TYPES, DEPENDENCY_CONTAINER, createDependencyContainer } from '@configuration';
import { FIRESTORE_DATA } from './mock/Firestore.mock';
import { randomBytes } from 'crypto';
import {
    consultarPinErrado,
    consultarPinFallido,
    consultarPinGuiaInexistente,
    consultarPinOK,
    guardarPinError,
    guardarPinOk,
    recuperarFormaEnvioF,
    recuperarFormaEnvioInexistente,
    recuperarFormaEnvioOk,
    recuperarPinF,
    recuperarPinGuiaInexistente,
    recuperarPinOk,
} from './mock';

const MockFirestore = new MockFirebase(FIRESTORE_DATA);
const firestore = MockFirestore.firestore();

describe('MS tracking pin guia', () => {
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
    //
    describe('consultar-pin', () => {
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
            expect(JSON.parse(response.body).data.pinValido).toBeTruthy;
        });

        it('test correcto, para consultar pin, de guia inexistente', async () => {
            const response = await application.inject({
                method: 'POST',
                url: '/consultarPin',
                payload: consultarPinGuiaInexistente,
            });
            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.body).isError).toBeFalsy();
            expect(JSON.parse(response.body).data.pinValido).toBeFalsy();
        });

        it('test correcto, para consultar pin errado', async () => {
            const response = await application.inject({
                method: 'POST',
                url: '/consultarPin',
                payload: consultarPinErrado,
            });
            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.body).isError).toBeFalsy();
            expect(JSON.parse(response.body).data.pinValido).toBeFalsy();
        });
    });
    ///
    describe('consultar-formaenvio', () => {
        it('test exitoso para consulta forma de envio', async () => {
            const response = await application.inject({
                method: 'POST',
                url: '/consultarFormaEnvio',
                payload: recuperarFormaEnvioOk,
            });
            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.body).isError).toBeFalsy();
        });

        it('test fallido para consulta forma de envio', async () => {
            const response = await application.inject({
                method: 'POST',
                url: '/consultarFormaEnvio',
                payload: recuperarFormaEnvioF,
            });
            expect(response.statusCode).toBe(400);
        });

        it('test exitoso para consulta forma de envio, con guia inexistente', async () => {
            const response = await application.inject({
                method: 'POST',
                url: '/consultarFormaEnvio',
                payload: recuperarFormaEnvioInexistente,
            });
            expect(response.statusCode).toBe(400);
            expect(JSON.parse(response.body).isError).toBeTruthy();
        });

        it('test exitoso para consulta forma de envio, tipo usuario', async () => {
            const response = await application.inject({
                method: 'POST',
                url: '/consultarFormaEnvio',
                payload: recuperarFormaEnvioOk,
            });
            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.body).data).toHaveProperty('remitente');
            expect(JSON.parse(response.body).data).toHaveProperty('destinatario');
        });

        it('test fallido para consulta forma de envio, sin data de envio', async () => {
            const response = await application.inject({
                method: 'POST',
                url: '/consultarFormaEnvio',
            });
            expect(response.statusCode).toBe(500);
            expect(JSON.parse(response.body).isError).toBeTruthy();
        });

        it('test fallido para consulta forma de envio, con data de envio vacia', async () => {
            const response = await application.inject({
                method: 'POST',
                url: '/consultarFormaEnvio',
                payload: {},
            });
            expect(response.statusCode).toBe(400);
            expect(JSON.parse(response.body).isError).toBeTruthy();
        });
    });
    //recuperar pin
    describe('recuperar-pin', () => {
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
            expect(JSON.parse(response.body).isError).toBeFalsy();
        });

        it('test exitoso para recuperar pin, de guia inexistente', async () => {
            const response = await application.inject({
                method: 'POST',
                url: '/recuperarPin',
                payload: recuperarPinGuiaInexistente,
            });
            expect(response.statusCode).toBe(400);
            expect(JSON.parse(response.body).isError).toBeTruthy();
        });
    });

    describe('guardar-pin', () => {
        it('test fallido para guardar pin, error firebase', async () => {
            const response = await application.inject({
                method: 'POST',
                url: '/',
                payload: {
                    message: {
                        data: Buffer.from(JSON.stringify(guardarPinOk)).toString('base64'),
                        publishTime: new Date(),
                        messageId: randomBytes(16).toString('hex'),
                    },
                },
            });
            expect(response.statusCode).toBe(400);
            expect(JSON.parse(response.body).isError).toBeTruthy;
        });

        it('test fallido para guardar pin, error esquema', async () => {
            const response = await application.inject({
                method: 'POST',
                url: '/',
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
    });
});
