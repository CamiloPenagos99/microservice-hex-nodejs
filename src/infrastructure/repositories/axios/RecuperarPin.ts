import { injectable } from 'inversify';
import 'reflect-metadata';
import axios from 'axios';

import { JsonObject } from 'swagger-ui-express';
import { IRecuperarPinOut } from '@application/data';
import { URL_PIN_GUIA } from '@util';

@injectable()
export class RecuperarPin {
    public async recuperar(data: IRecuperarPinOut): Promise<JsonObject> {
        try {
            return await axios({
                method: 'post',
                url: URL_PIN_GUIA, //manejar por ambiente
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
                timeout: 500,
            })
                .then((res) => {
                    return res.data;
                })
                .catch((err: JsonObject) => {
                    //console.error('Error axios cm-suite-pin-guia', err.response.data.mensaje);
                    return { isError: true, mensaje: err.response.data.mensaje };
                });
        } catch (e) {
            console.error(e);
            return { isError: true, mensaje: e };
        }
    }
}
