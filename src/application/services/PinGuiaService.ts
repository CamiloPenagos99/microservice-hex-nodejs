import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { IDataIn, IEnvioDataOut, IGuiaIn, IGuiaPinIn } from '@application/data';
import { TrackingRepository } from '@domain/repository';
import { dataRecuperarPin, reconstruccionData } from '@application/util';
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

    async recuperarPin(data: IGuiaIn): Promise<Response<JsonObject | null>> {
        const result = await this.guiaRepository.recuperarPin(data);
        const respuesta = result;
        console.log(respuesta);
        return Result.ok(result);
    }

    async recuperarDataEnvio(data: IGuiaIn): Promise<Response<IEnvioDataOut | null>> {
        const result = await this.guiaRepository.recuperarDataEnvio(data);
        const resultado = dataRecuperarPin(result);
        return Result.ok(resultado);
    }
}
