import { getDataBase, getURIBase } from './URL';

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const GCP_PROJECT = process.env.GCP_PROJECT || 'cm-api-tracking-dev';

export const PREFIX = process.env.SERVICE_NAME || 'cm-tracking-almacenar-pin-guia';

export const URL_PIN_GUIA =
    process.env.URL_PIN_GUIA || 'https://apiv2-dev.coordinadora.com/cm-suite-pin-guia/recuperarPin';

export const URL_PIN_TRACKING = 'apiv2-dev.coordinadora.com/cm-tracking-almacenar-pin-guia';

export const URL_BASE = getURIBase(NODE_ENV);
//TODO RESOLVER LA URL SEGUN AMBIENTE

export const URL_BASE_DATABASE = getDataBase(NODE_ENV);

console.log('GCP PROJECT', GCP_PROJECT);
console.log('NODE_ENV', NODE_ENV);

console.log('variables entorno GKE:', {
    NODE_ENV,
    GCP_PROJECT,
    PREFIX,
    URL_PIN_GUIA,
    URL_PIN_TRACKING,
    URL_BASE_DATABASE,
});
