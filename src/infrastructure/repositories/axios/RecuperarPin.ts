import { injectable } from 'inversify';
import 'reflect-metadata';
import axios from 'axios';

import { JsonObject } from 'swagger-ui-express';
import { IRecuperarPinOut } from '@application/data';
import { URL_PIN_GUIA } from '@util';

@injectable()
export class RecuperarPin {
    public async recuperar(data: IRecuperarPinOut): Promise<JsonObject> {
        console.log(`data recuperacion: ${JSON.stringify(data)}`);
        try {
            return await axios({
                method: 'POST',
                url: URL_PIN_GUIA, //manejar por ambiente
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            })
                .then((res) => {
                    console.log(`${JSON.stringify(res.data)}`);
                    return res.data;
                })
                .catch((err: JsonObject) => {
                    console.error('Error axios cm-suite-pin-guia', err.response.data.message);
                    return { isError: true, mensaje: err.response.data.message };
                });
        } catch (e) {
            console.error(e);
            return { isError: true, mensaje: e };
        }
    }
}
