import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { TrackingRepository } from '@domain/repository';
import { GuiasRemitenteEntity } from '@domain/entities';
import { Result, Response } from '@domain/response';
import { IConsultaGuiasRtteIn } from '@application/data';
import { JsonObject } from 'swagger-ui-express';

@injectable()
export class GuiasRemitenteService {
    private guiaRepository = DEPENDENCY_CONTAINER.get<TrackingRepository>(TYPES.FirestoreTrackingRepository);

    async consultarInfo(data: IConsultaGuiasRtteIn): Promise<Response<JsonObject | null>> {
        const entidad = GuiasRemitenteEntity.crearEntidad(data);
        const result = await this.guiaRepository.consultarGuiasRemitente(entidad);
        return Result.ok(result);
    }
}
