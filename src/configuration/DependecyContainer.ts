import { Container } from 'inversify';
import { Firestore } from '@google-cloud/firestore';
import { ExampleAppService, PinGuiaService } from '@application/services';
import { firestore, FirestoreExampleRepository } from '@infrastructure/repositories';
import { ExampleRepository, TrackingRepository } from '@domain/repository';
import { TYPES } from '@configuration';
import { FirestoreTrackingRepository } from '@infrastructure/repositories/firestore/dao/FirestoreTrackingRepository';

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind<Firestore>(TYPES.Firestore).toConstantValue(firestore);
    DEPENDENCY_CONTAINER.bind(ExampleAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(PinGuiaService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind<ExampleRepository>(TYPES.FirestoreExampleRepository)
        .to(FirestoreExampleRepository)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<TrackingRepository>(TYPES.FirestoreTrackingRepository)
        .to(FirestoreTrackingRepository)
        .inSingletonScope();
};
