import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { IDataEnvioIn, IDataIn, IEnvioDataOut, IGuiaPinIn } from '@application/data';
import { TrackingRepository } from '@domain/repository';
import {
    dataRecuperarPinDestinatario,
    dataRecuperarPinRemitente,
    dataRecuperarPinSalida,
    reconstruccionData,
} from '@application/util';
import { JsonObject } from 'swagger-ui-express';
import { RecuperarPin } from '@infrastructure/repositories';
//import { NotFoundException } from '@domain/exceptions';

@injectable()
export class PinGuiaService {
    private guiaRepository = DEPENDENCY_CONTAINER.get<TrackingRepository>(TYPES.FirestoreTrackingRepository);
    private axiosRecuperarPin = DEPENDENCY_CONTAINER.get<RecuperarPin>(RecuperarPin);
    async guardarPin(data: IDataIn): Promise<Response<string | null>> {
        data.guias.forEach(async (guia) => {
            const dataFinal = reconstruccionData(guia, data);
            await this.guiaRepository.guardarPin(dataFinal);
        });
        return Result.ok();
    }

    async consultarPin(data: IGuiaPinIn): Promise<Response<JsonObject | null>> {
        const result = await this.guiaRepository.consultarPin(data);
        const respuesta = { pinValido: result };
        return Result.ok(respuesta);
    }

    async recuperarPin(data: IDataEnvioIn): Promise<Response<string | null>> {
        const result = await this.guiaRepository.recuperarPin(data);
        const respuesta = dataRecuperarPinSalida(result, data);
        const res = await this.axiosRecuperarPin.recuperar(respuesta);
        console.log('@@@@@@@@ ', res);
        if (!res.isError) {
            return Result.ok('correo enviado');
        }

        return Result.failure(res[0]);
    }

    async recuperarDataEnvio(data: IDataEnvioIn): Promise<Response<IEnvioDataOut | null>> {
        const result = await this.guiaRepository.recuperarDataEnvio(data);
        const resultado =
            data.tipoUsuario === 'REMITENTE' ? dataRecuperarPinRemitente(result) : dataRecuperarPinDestinatario(result);
        return Result.ok(resultado);
    }
}
