import { AutenticacionAppService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';

export const example = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const authService = DEPENDENCY_CONTAINER.get(AutenticacionAppService);
    console.log(authService);
    const { id } = req;
    const response = await authService.getToken('test');
    //const response = { token: 'firebasetoken' };
    return reply.send({ ...response, id });
};
