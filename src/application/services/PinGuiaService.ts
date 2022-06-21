import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { IDataEnvioIn, IDataIn, IEnvioDataOut, IGuiaIn, IGuiaPinIn } from '@application/data';
import { TrackingRepository } from '@domain/repository';
import { dataRecuperarPinFormat, dataRecuperarPinSalida, reconstruccionData } from '@application/util';
import { RecuperarPin } from '@infrastructure/repositories';
import { GuardarGuiaTriggerEntity, GuardarPinEntity, RecuperarPinEntity } from '@domain/entities';
import { signToken } from '@util';
import { ApiException, FirestoreException } from '@domain/exceptions';
import { IDataInTrigger } from '@application/data/IDataInTrigger';
import { controlIntentosAcceso, modificarIntentosPinGuia } from '@domain/services';
import { PinValidadoGuia } from '@domain/models';

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

    async guardarPinGuia(data: IDataIn): Promise<Response<string | null>> {
        const guiaPin = reconstruccionData(data.guias[0], data);
        const entidad = GuardarPinEntity.crearEntidad(guiaPin);
        await this.guiaRepository.guardarPin(entidad);
        return Result.ok(`Se registro el pin para la guia, ${entidad.codigo_remision}`);
    }

    async validarPinGuia(data: IGuiaPinIn): Promise<Response<PinValidadoGuia | null>> {
        const pinGuia = await this.guiaRepository.consultarPin(data.guia);
        const token = await signToken(pinGuia.codigo_remision); // firmar el token con firebase admin
        const validacion = controlIntentosAcceso(data, pinGuia, token);
        const nuevoToken = modificarIntentosPinGuia(validacion, pinGuia);
        await this.guiaRepository.modificarIntentosPinGuia(data.guia, nuevoToken);
        return Result.ok(validacion);
    }

    async recuperarPin(data: IDataEnvioIn): Promise<Response<string | null>> {
        const entidad = RecuperarPinEntity.crearEntidad(data);
        const result = await this.guiaRepository.recuperarPin(entidad);
        const respuesta = dataRecuperarPinSalida(result, data);
        const res = await this.axiosRecuperarPin.recuperar(respuesta);
        if (!res.isError) {
            await this.guiaRepository.reiniciarIntentosPin(entidad);
            return Result.ok('información enviada correctamente');
        }

        throw new ApiException(res.mensaje);
    }

    async recuperarDataEnvio(data: IGuiaIn): Promise<Response<IEnvioDataOut | null>> {
        const { guia } = data;
        const guiaPin = await this.guiaRepository.consultarPin(guia);
        const resultado = dataRecuperarPinFormat(guiaPin);
        return Result.ok(resultado);
    }

    guardarGuiasUtil = async (data: IDataIn): Promise<number> => {
        let contador = 0;
        for (let i = 0; i < data.guias.length; i++) {
            const dataFinal = reconstruccionData(data.guias[i], data);
            const entidad = GuardarPinEntity.crearEntidad(dataFinal);
            const result = await this.guiaRepository.guardarPin(entidad);
            if (result) contador++;
        }
        return contador;
    };

    async guardarTrigger(data: IDataInTrigger): Promise<Response<string | null>> {
        const entidad = GuardarGuiaTriggerEntity.crearEntidad(data);
        const result = await this.guiaRepository.guardarTrigger(entidad);
        return Result.ok(`Se guardo en la base de datos: ` + result);
    }

    async consultarGuiaTracking(guia: string): Promise<Response<string | null>> {
        const result = await this.guiaRepository.consultarGuiaTracking(guia);
        console.log(JSON.stringify(result));
        return Result.ok(result);
    }
}
