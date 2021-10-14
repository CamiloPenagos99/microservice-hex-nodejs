import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { IDataEnvioIn, IDataIn, IEnvioDataOut, IGuiaIn, IGuiaPinIn } from '@application/data';
import { TrackingRepository } from '@domain/repository';
import { dataRecuperarPinCompleto, dataRecuperarPinSalida, reconstruccionData } from '@application/util';
import { JsonObject } from 'swagger-ui-express';
import { RecuperarPin } from '@infrastructure/repositories';
import { ConsultarEnvioEntity, GuardarPinEntity, RecuperarPinEntity } from '@domain/entities';
import { ConsultarPinEntity } from '@domain/entities/ConsultarPinEntity';
import { generarJWT } from '@util';

//import { NotFoundException } from '@domain/exceptions';

@injectable()
export class PinGuiaService {
    private guiaRepository = DEPENDENCY_CONTAINER.get<TrackingRepository>(TYPES.FirestoreTrackingRepository);
    private axiosRecuperarPin = DEPENDENCY_CONTAINER.get<RecuperarPin>(RecuperarPin);
    async guardarPin(data: IDataIn): Promise<Response<string | null>> {
        let contador = 0;
        data.guias.forEach(async (guia) => {
            const dataFinal = reconstruccionData(guia, data);
            const entidad = GuardarPinEntity.crearEntidad(dataFinal);
            const result = await this.guiaRepository.guardarPin(entidad);
            if (result) contador++;
            console.log('--------------->resultado save------------->', result);
        });
        if (contador === 0) return Result.ok('error al guardar en base de datos');
        return Result.ok(`Se guardo en base de datos, ${contador} registros`);
    }

    async consultarPin(data: IGuiaPinIn): Promise<Response<JsonObject | null>> {
        const entidad = ConsultarPinEntity.crearEntidad(data);
        const result = await this.guiaRepository.consultarPin(entidad);
        let token = '';
        if (result) {
            token = generarJWT(data.guia);
        }
        const respuesta = { pinValido: result, bearer: token };
        return Result.ok(respuesta);
    }

    async recuperarPin(data: IDataEnvioIn): Promise<Response<string | null>> {
        const entidad = RecuperarPinEntity.crearEntidad(data);
        const result = await this.guiaRepository.recuperarPin(entidad);
        if (!result) return Result.ok(result);
        const respuesta = dataRecuperarPinSalida(result, data);
        const res = await this.axiosRecuperarPin.recuperar(respuesta);
        if (!res.isError) {
            return Result.ok('información enviada correctamente');
        }

        return Result.failure(res[0]);
    }

    async recuperarDataEnvio(data: IGuiaIn): Promise<Response<IEnvioDataOut | null>> {
        const entidad = ConsultarEnvioEntity.crearEntidad(data);
        const result = await this.guiaRepository.recuperarDataEnvio(entidad);
        if (!result) {
            return Result.ok(result);
        }
        const resultado = dataRecuperarPinCompleto(result);
        return Result.ok(resultado);
    }
}
