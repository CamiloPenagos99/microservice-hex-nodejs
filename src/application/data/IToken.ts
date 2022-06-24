export interface IToken {
    destinatario: {
        intentos: number;
        pin: string;
    };
    remitente: {
        intentos: number;
        pin: string;
    };
}
