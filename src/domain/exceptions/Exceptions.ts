import { ErrorCode, StatusCode } from './ErrorCode';

export abstract class Exception {
    isError: boolean;
    message: string;
    code: ErrorCode;
    statusCode: number;
    cause: string | null;

    constructor(message: string, code: ErrorCode, statusCode: number, cause?: string) {
        this.isError = true;
        this.message = message;
        this.code = code;
        this.statusCode = statusCode;
        this.cause = cause || null;
    }
}

export class BadMessageException extends Exception {
    constructor(cause: string) {
        const message = 'Los datos de entrada no corresponden con el esquema definido - ' + cause;
        super(message, ErrorCode.BAD_MESSAGE, StatusCode.BAD_REQUEST, cause);
    }
}

export class RepositoryException extends Exception {
    constructor(message: string, statusCode: number, cause: string) {
        super(message, ErrorCode.REPOSITORY_ERROR, statusCode, cause);
    }
}

export class ApiException extends Exception {
    constructor(cause: string) {
        const er = 'Error al momento de recuperar el Pin - ' + cause;
        super(er, ErrorCode.BAD_MESSAGE, StatusCode.BAD_REQUEST, cause);
    }
}

export class FirestoreException extends Exception {
    constructor(code: number | string, message: string) {
        const fsError = ErrorCode.REPOSITORY_ERROR;
        switch (code) {
            case 0:
            case '0':
                super(message, fsError, StatusCode.NOT_FOUND, 'Record not found in database');
                break;
            /*
            case 1:
            case '1':
                super(message, fsError, StatusCode.INTERNAL_ERROR, 'Firestore action cancelled');
                break;
            case 2:
            case '2':
                super(message, fsError, StatusCode.INTERNAL_ERROR, 'Firestore unknown error');
                break;
            case 3:
            case '3':
                super(message, fsError, StatusCode.OK, 'Firestore invalid argument');
                break;
            case 4:
            case '4':
                super(message, fsError, StatusCode.INTERNAL_ERROR, 'Firestore deadline exceeded');
                break;
            case 7:
            case '7':
                super(message, fsError, StatusCode.INTERNAL_ERROR, 'Firestore permission denied');
                break;
            case 8:
            case '8':
                super(message, fsError, StatusCode.OK, 'Firestore resource exhausted');
                break;
                 */
            case 9:
            case '9':
                super(message, fsError, StatusCode.BAD_REQUEST, 'Firestore precondition failed');
                break;
            default:
                super(message, fsError, StatusCode.INTERNAL_ERROR, 'Defaulted unkwnown fs error');
                break;
        }
    }
}
