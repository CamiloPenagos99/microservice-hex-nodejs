import { injectable } from 'inversify';
import 'reflect-metadata';
import axios, { AxiosError } from 'axios';
import { JsonObject } from 'swagger-ui-express';
import { IRecuperarPinOut } from '@application/data';
import { URL_PIN_GUIA } from '@util';
import { ApiRestException, Exception } from '@domain/exceptions';
import { Response } from '@domain/response';
import { IRecuperarPin } from '@domain/models';

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

    public async recuperarPin(data: IRecuperarPin): Promise<boolean> {
        console.log(`data recuperacion pin ${JSON.stringify(data)}`);
        try {
            const responseApi = await axios.post<Response<boolean>>(URL_PIN_GUIA, data, {
                timeout: 5000,
            });
            const dataResponse = responseApi.data;
            console.log('respuesta api', dataResponse);
            return true;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const err = e as AxiosError<Exception>;
                const error = err.response ? err.response.data : err;
                console.error(`error api recuperar pin ${data.codigo_remision} ${error.message}`);
                throw new ApiRestException(error.message, 'error api anular guia');
            }
            console.error(`error api desconocido recuperar pin ${e}`);
            throw new ApiRestException(e.message, 'error api anular guia desconocido');
        }
    }
}
