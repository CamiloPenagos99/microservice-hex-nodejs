import { JsonObject } from 'swagger-ui-express';

export interface IEnvioDataOutComplete {
    remitente: JsonObject;
    destinatario: JsonObject;
    codigo_remision: string;
}
