import { injectable } from 'inversify';
import { TYPES, DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { IDataIn } from '@application/data';
import { TrackingRepository } from '@domain/repository';
//import { NotFoundException } from '@domain/exceptions';

@injectable()
export class PinGuiaService {
    private guiaRepository = DEPENDENCY_CONTAINER.get<TrackingRepository>(TYPES.FirestoreTrackingRepository);
    async guardarPin(data: IDataIn): Promise<Response<string | null>> {
        await this.guiaRepository.guardarPin(data);
        return Result.ok();
    }
}
