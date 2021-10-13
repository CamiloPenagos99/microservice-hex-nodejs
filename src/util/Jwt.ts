import { application } from '../infrastructure/api/Application';

export const generarJWT = (payload: string)=>{
 // some code
 const token = application.jwt.sign({ payload })
 return token;
}