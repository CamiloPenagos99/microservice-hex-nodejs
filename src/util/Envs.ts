export const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'development';

export const GCP_PROJECT = process.env.GCP_PROJECT || 'cm-api-tracking-dev';

export const PREFIX = process.env.SERVICE_NAME || 'cm-tracking-almacenar-pin-guia';

export const URL_PIN_GUIA = 'https://apiv2-dev.coordinadora.com/cm-suite-pin-guia/recuperarPin';
//TODO RESOLVER LA URL SEGUN AMBIENTE

console.log('GCP PROJECT', GCP_PROJECT);
