import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { consultarPinGuiaSchema, guardarPinGuiaSchema, IGuiaSchema, validateDataPubSub } from '../util';
import { PinGuiaService } from '@application/services';
//import { BadMessageException } from '@domain/exceptions';
import { IDataIn, IGuiaPinIn, IGuiaIn } from '@application/data';
import { BadMessageException } from '@domain/exceptions';

export const guardarPinGuia = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const body = validateDataPubSub<IDataIn>(guardarPinGuiaSchema, req.body);
    const respuesta = await pinGuiaService.guardarPin(body);
    reply.status(200).send({ ...respuesta });
};

export const consultarPinGuia = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const { id } = req;

    const data = req.body as IGuiaPinIn;
    const { value: schema, error } = consultarPinGuiaSchema.validate(data);
    if (!error) {
        const guia: IGuiaPinIn = schema;
        const response = await pinGuiaService.consultarPin(guia);
        console.log('data router', response);
        return reply.send({ ...response, id });
    }
    throw new BadMessageException(error.message);
};

export const recuperarPinGuia = async (_req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const { id } = _req;
    const guia = _req.body as IGuiaIn;
    const { value: schema, error } = IGuiaSchema.validate(guia);
    if (!error) {
        const guia: IGuiaPinIn = schema;
        const response = await pinGuiaService.recuperarPin(guia);
        console.log('data router', response);
        return reply.send({ ...response, id });
    }
    throw new BadMessageException(error.message);
};
