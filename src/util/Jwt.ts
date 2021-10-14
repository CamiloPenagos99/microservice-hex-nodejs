import { application } from '../infrastructure/api/Application';

export const generarJWT = (payload: string): any => {
    // some code
    const token = application.jwt.sign({ payload });
    return token;
};
