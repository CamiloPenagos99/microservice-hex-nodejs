import { Container } from 'inversify';
import { Firestore } from '@google-cloud/firestore';
import { PinGuiaService } from '@application/services';
import { firestore, RecuperarPin } from '@infrastructure/repositories';
import { TrackingRepository } from '@domain/repository';
import { TYPES } from '@configuration';
import { FirestoreTrackingRepository } from '@infrastructure/repositories/firestore/dao/FirestoreTrackingRepository';

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind<Firestore>(TYPES.Firestore).toConstantValue(firestore);
    DEPENDENCY_CONTAINER.bind(RecuperarPin).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(PinGuiaService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind<TrackingRepository>(TYPES.FirestoreTrackingRepository)
        .to(FirestoreTrackingRepository)
        .inSingletonScope();
};
