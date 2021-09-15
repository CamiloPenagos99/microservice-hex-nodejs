import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { guardarPinGuiaSchema, validateDataPubSub } from '../util';
import { PinGuiaService } from '@application/services';
//import { BadMessageException } from '@domain/exceptions';
import { IDataIn } from '@application/data';

export const guardarPinGuia = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const body = validateDataPubSub<IDataIn>(guardarPinGuiaSchema, req.body);
    const respuesta = await pinGuiaService.guardarPin(body);
    reply.status(200).send({ ...respuesta });
};
