import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { IDataEnvioPin, IDataGuiaPinTracking, IDataIn, IGuiaIn, IGuiaPinIn } from '@application/data';
import { TrackingRepository } from '@domain/repository';
import { dataRecuperarPinFormat, formatDataRecuperarPin, reconstruccionData } from '@application/util';
import { RecuperarPin } from '@infrastructure/repositories';
import { GuardarPinEntity } from '@domain/entities';
import { signToken } from '@util';
import {
    controlIntentosAcceso,
    dataGuiaPin,
    modificarIntentosPinGuia,
    reiniciarIntentosPinGuia,
} from '@domain/services';
import { PinValidadoGuia } from '@domain/models';
import { IDataRecuperacionPinOut } from '@application/data/IDataRecuperacionPinOut';

@injectable()
export class PinGuiaService {
    private guiaRepository = DEPENDENCY_CONTAINER.get<TrackingRepository>(TYPES.FirestoreTrackingRepository);
    private axiosRecuperarPin = DEPENDENCY_CONTAINER.get<RecuperarPin>(RecuperarPin);

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

    async recuperarPin(data: IDataEnvioPin): Promise<Response<string | null>> {
        const pinGuia = await this.guiaRepository.consultarPin(data.guia);
        const dataRecuperacion = formatDataRecuperarPin(pinGuia, data);
        console.log(`recuperar pin ${JSON.stringify(dataRecuperacion)}`);
        await this.axiosRecuperarPin.recuperarPin(dataRecuperacion);
        const token = reiniciarIntentosPinGuia(data, pinGuia);
        await this.guiaRepository.modificarIntentosPinGuia(data.guia, token);
        return Result.ok(`pin enviado correctamente para la guía ${data.guia}`);
    }

    async recuperarDataEnvio(data: IGuiaIn): Promise<Response<IDataRecuperacionPinOut | null>> {
        const { guia } = data;
        const guiaPin = await this.guiaRepository.consultarPin(guia);
        const resultado = dataRecuperarPinFormat(guiaPin);
        return Result.ok(resultado);
    }

    async consultarGuiaToken(guia: string): Promise<Response<IDataGuiaPinTracking | null>> {
        const pinGuia = await this.guiaRepository.consultarPin(guia);
        const data = dataGuiaPin(pinGuia);
        return Result.ok(data);
    }
}
