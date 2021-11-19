import 'reflect-metadata';
import { injectable } from 'inversify';
import { getToken } from '@util';
import { Response, Result } from '@domain/response';

@injectable()
export class AutenticacionAppService {
    async getToken(guia: string): Promise<Response<string | null>> {
        const token = await getToken(guia);
        return Result.ok(token);
    }
}
