import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { IDataEnvioIn, IDataIn, IEnvioDataOut, IGuiaPinIn, IRecuperarPinOut } from '@application/data';
import { TrackingRepository } from '@domain/repository';
import {
    dataRecuperarPinDestinatario,
    dataRecuperarPinRemitente,
    dataRecuperarPinSalida,
    reconstruccionData,
} from '@application/util';
import { JsonObject } from 'swagger-ui-express';
//import { NotFoundException } from '@domain/exceptions';

@injectable()
export class PinGuiaService {
    private guiaRepository = DEPENDENCY_CONTAINER.get<TrackingRepository>(TYPES.FirestoreTrackingRepository);
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

    async recuperarPin(data: IDataEnvioIn): Promise<Response<IRecuperarPinOut | null>> {
        const result = await this.guiaRepository.recuperarPin(data);
        const respuesta = dataRecuperarPinSalida(result, data);
        console.log(respuesta);
        return Result.ok(respuesta);
    }

    async recuperarDataEnvio(data: IDataEnvioIn): Promise<Response<IEnvioDataOut | null>> {
        const result = await this.guiaRepository.recuperarDataEnvio(data);
        const resultado =
            data.tipoUsuario === 'REMITENTE' ? dataRecuperarPinRemitente(result) : dataRecuperarPinDestinatario(result);
        return Result.ok(resultado);
    }
}
