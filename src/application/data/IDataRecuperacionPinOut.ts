export interface IDataRecuperacionPinOut {
    remitente: {
        telefono: string;
        correo: string;
    };
    destinatario: {
        telefono: string;
        correo: string;
    };
    codigo_remision: string;
}
