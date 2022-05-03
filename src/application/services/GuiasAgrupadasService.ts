import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { TrackingRepository } from '@domain/repository';
import { GuiasRemitenteEntity } from '@domain/entities';
import { Result, Response } from '@domain/response';
import { IConsultaGuiasGrupoIn, IConsultaGuiasRtteIn, IGuiaPinTracking } from '@application/data';
import { JsonObject } from 'swagger-ui-express';

@injectable()
export class GuiasAgrupadasService {
    private guiaRepository = DEPENDENCY_CONTAINER.get<TrackingRepository>(TYPES.FirestoreTrackingRepository);

    async consultarInfo(data: IConsultaGuiasRtteIn): Promise<Response<JsonObject | null>> {
        const entidad = GuiasRemitenteEntity.crearEntidad(data);
        const result = await this.guiaRepository.consultarGuiasRemitente(entidad);
        return Result.ok(result);
    }

    async consultarGuiasAgrupadas(data: IConsultaGuiasGrupoIn): Promise<Response<IGuiaPinTracking[] | null>> {
        //const entidad = GuiasRemitenteEntity.crearEntidad(data);
        console.log(`Consultando grupo de guias de: nit ${data.nit} - llamada: ${data.id_llamada} tipo: ${data.tipo}`);
        const result = await this.guiaRepository.consultarGuiasAgrupadas(data);
        return Result.ok(result);
    }
}
