import 'reflect-metadata';
import { createDependencyContainer, DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import MockFirebase from 'mock-cloud-firestore';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { FIRESTORE_DATA, recuperarFormaEnvioOk } from '../../mock';
import { Firestore } from '@google-cloud/firestore';
import { application } from '@infrastructure/api/Application';

const feature = loadFeature('./test/BDD/ValidarFormaEnvio.feature');

defineFeature(feature, (test) => {
    const MockFirestore = new MockFirebase(FIRESTORE_DATA);
    const firestore = MockFirestore.firestore();
    let response: any;
    const dataTest = recuperarFormaEnvioOk;

    beforeAll(() => {
        createDependencyContainer();
        DEPENDENCY_CONTAINER.rebind<Firestore>(TYPES.Firestore).toConstantValue(firestore);
    });

    test('Solicitar recuperación con correo y celular registrado', ({ given, when, then }) => {
        given(/^Que la guía consultada (.*) tiene registrados el correo y el telefono$/, (codigo_remision: string) => {
            dataTest.guia = codigo_remision;
        });

        when('Solicite la informacion de envio, del rol REMITENTE', async () => {
            response = await application.inject({
                method: 'POST',
                url: '/consultarFormaEnvio',
                payload: dataTest,
            });
        });

        then(
            /^Se debe visualizar las opciones de recuperación, CORREO debe ser igual a (.*) y el TELEFONO debe ser igual a (.*)$/,
            (correo: string, telefono: string) => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.body).data).toHaveProperty('remitente');
                expect(JSON.parse(response.body).data).toHaveProperty('destinatario');
                expect(JSON.parse(response.body).data.remitente.correo).toBe(correo);
                expect(JSON.parse(response.body).data.remitente.telefono).toBe(telefono);
            },
        );
    });

    //segundo test
    test('Solicitar recuperación con correo registrado', ({ given, when, then }) => {
        given(/^Que la guía consultada (.*) tiene registrado el correo$/, (codigo_remision: string) => {
            dataTest.guia = codigo_remision;
        });

        when('Solicite la informacion de envio, del rol REMITENTE', async () => {
            response = await application.inject({
                method: 'POST',
                url: '/consultarFormaEnvio',
                payload: dataTest,
            });
        });
        then(
            /^Se debe visualizar las opciones de recuperación, CORREO debe ser igual a (.*) y el TELEFONO debe ser igual a (.*)$/,
            (correo: string, telefono: string) => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.body).data).toHaveProperty('remitente');
                expect(JSON.parse(response.body).data).toHaveProperty('destinatario');
                expect(JSON.parse(response.body).data.remitente.correo).toBe(correo);
                expect(JSON.parse(response.body).data.remitente.telefono).toHaveLength(parseInt(telefono));
            },
        );
    });

    //tercer test
    test('Solicitar recuperación con celular registrado', ({ given, when, then }) => {
        given(/^Que la guía consultada (.*) tiene registrado el celular$/, (codigo_remision: string) => {
            dataTest.guia = codigo_remision;
        });

        when('Solicite la informacion de envio, del rol REMITENTE', async () => {
            response = await application.inject({
                method: 'POST',
                url: '/consultarFormaEnvio',
                payload: dataTest,
            });
        });

        then(
            /^Se debe visualizar las opciones de recuperación, CORREO debe ser igual a (.*) y el TELEFONO debe ser igual a (.*)$/,
            (correo: string, telefono: string) => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.body).data).toHaveProperty('remitente');
                expect(JSON.parse(response.body).data).toHaveProperty('destinatario');
                expect(JSON.parse(response.body).data.remitente.correo).toHaveLength(parseInt(correo));
                expect(JSON.parse(response.body).data.remitente.telefono).toBe(telefono);
            },
        );
    });
});
