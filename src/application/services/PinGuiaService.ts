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
import { ApiException, FirestoreException } from '@domain/exceptions';

//import { NotFoundException } from '@domain/exceptions';

@injectable()
export class PinGuiaService {
    private guiaRepository = DEPENDENCY_CONTAINER.get<TrackingRepository>(TYPES.FirestoreTrackingRepository);
    private axiosRecuperarPin = DEPENDENCY_CONTAINER.get<RecuperarPin>(RecuperarPin);

    async guardarPin(data: IDataIn): Promise<Response<string | null>> {
        const guiasRegistradas = await this.guardarGuiasUtil(data);
        //console.log('cantidad de guias registradas', guiasRegistradas);
        if (guiasRegistradas === 0) throw new FirestoreException(9, 'Unable to save in database');
        return Result.ok(`Se guardo en la base de datos, ${guiasRegistradas} registros`);
    }

    async consultarPin(data: IGuiaPinIn): Promise<Response<JsonObject | null>> {
        const entidad = ConsultarPinEntity.crearEntidad(data);
        const result = await this.guiaRepository.consultarPin(entidad);
        let token = '';
        if (result) {
            token = generarJWT(data.guia);
        }
        const respuesta = { pinValido: result, bearer: token, intentos: 1 };
        return Result.ok(respuesta);
    }

    async consultarPinCont(data: IGuiaPinIn): Promise<Response<JsonObject | null>> {
        const entidad = ConsultarPinEntity.crearEntidad(data);
        const result = await this.guiaRepository.consultarPinCont(entidad);
        let token = '';
        if (result) {
            token = generarJWT(data.guia);
        }
        const respuesta = { pinValido: result, bearer: token, intentos: 1 };
        return Result.ok(respuesta);
    }

    async validarPinGuia(data: IGuiaPinIn): Promise<Response<JsonObject | null>> {
        const entidad = ConsultarPinEntity.crearEntidad(data);
        const result = await this.guiaRepository.validarPinGuia(entidad);
        let token = '';
        if (result) {
            token = generarJWT(data.guia);
        } else if (!result) {
            throw new FirestoreException(0, 'no se encontro la guia');
        }
        const respuesta = { pinValido: result, bearer: token };
        return Result.ok(respuesta);
    }

    async recuperarPin(data: IDataEnvioIn): Promise<Response<string | null>> {
        const entidad = RecuperarPinEntity.crearEntidad(data);
        const result = await this.guiaRepository.recuperarPin(entidad);
        if (!result) return Result.ok(result);
        const respuesta = dataRecuperarPinSalida(result, data);
        const res = await this.axiosRecuperarPin.recuperar(respuesta); //TODO
        if (!res.isError) {
            await this.guiaRepository.reiniciarIntentosPin(entidad);
            return Result.ok('información enviada correctamente');
        }

        throw new ApiException(res.mensaje);
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

    guardarGuiasUtil = async (data: IDataIn): Promise<number> => {
        let contador = 0;
        for (let i = 0; i < data.guias.length; i++) {
            const dataFinal = reconstruccionData(data.guias[i], data);
            const entidad = GuardarPinEntity.crearEntidad(dataFinal);
            const result = await this.guiaRepository.guardarPin(entidad);
            if (result) contador++;
            //console.log('------------->resultado save------------>', result);
        }
        return contador;
    };
}
