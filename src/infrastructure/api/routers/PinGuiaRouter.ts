import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import {
    consultarPinGuiaSchema,
    guardarPinGuiaSchema,
    IDataEnvioSchema,
    validateData,
    validateDataPubSub,
} from '../util';
import { PinGuiaService } from '@application/services';
//import { BadMessageException } from '@domain/exceptions';
import { IDataIn, IGuiaPinIn, IDataEnvioIn, IGuiaIn } from '@application/data';
import { BadMessageException, FirestoreException } from '@domain/exceptions';

export const guardarPinGuia = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    console.log('En Kubernetes, llega la solicitud de pubsub');
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const body = validateDataPubSub<IDataIn>(guardarPinGuiaSchema, req.body);
    const respuesta = await pinGuiaService.guardarPin(body);
    reply.status(200).send({ ...respuesta });
};

export const consultarPinGuia = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    //const body = validateData<IDataIn>(consultarPinGuiaSchema, req.body);
    const { id } = req;

    const data = req.body as IGuiaPinIn;
    const { value: schema, error } = consultarPinGuiaSchema.validate(data);
    if (!error) {
        const guia: IGuiaPinIn = schema;
        const response = await pinGuiaService.consultarPin(guia);
        //console.log('data router', response);
        return reply.send({ ...response, id });
    }
    throw new BadMessageException(error.message);
};

export const validarPinGuia = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    //const body = validateData<IDataIn>(consultarPinGuiaSchema, req.body);
    const { id } = req;

    const data = req.body as IGuiaPinIn;
    const schema = validateData<IGuiaPinIn>(consultarPinGuiaSchema, data);
    const guia: IGuiaPinIn = schema;
    const response = await pinGuiaService.validarPinGuia(guia);
    return reply.send({ ...response, id });
};

export const recuperarPinGuia = async (_req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const validated = validateData<IDataEnvioIn>(IDataEnvioSchema, _req.body);
    const { id } = _req;
    const guia = validated as IDataEnvioIn;
    const response = await pinGuiaService.recuperarPin(guia);
    if (!response.data) throw new FirestoreException(0, 'Record not found in database');
    return reply.send({ ...response, id });
};

export const consultarFormaEnvio = async (_req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const validated = validateData<IGuiaIn>(IDataEnvioSchema, _req.body);
    const { id } = _req;
    const guia = validated as IGuiaIn;
    const response = await pinGuiaService.recuperarDataEnvio(guia);
    if (!response.data) throw new FirestoreException(0, 'Record not found in database');
    return reply.send({ ...response, id });
};

export const guardarTrigger = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    console.log('En Kubernetes, llega la solicitud de pubsub trigger');
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const body = validateDataPubSub<IDataIn>(guardarPinGuiaSchema, req.body);
    console.log('body pubsub:', body);
    const respuesta = await pinGuiaService.guardarTrigger(body);
    reply.status(200).send({ ...respuesta });
};
