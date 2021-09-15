export const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'development';

export const GCP_PROJECT = process.env.GCP_PROJECT || 'cm-api-tracking-dev';
console.log('GCP PROJECT', GCP_PROJECT);
