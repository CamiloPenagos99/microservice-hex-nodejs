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
import { FirestoreException } from '@domain/exceptions';

export const guardarPinGuia = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const body = validateDataPubSub<IDataIn>(guardarPinGuiaSchema, req.body);
    console.log('Guardando el pin de guia digital', 'llamada: ', body.id_llamada);
    const respuesta = await pinGuiaService.guardarPin(body);
    reply.status(200).send({ ...respuesta });
};

export const guardarPinGuiaPost = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const body = validateData<IDataIn>(guardarPinGuiaSchema, req.body);
    console.log(`Guardando el pin de guia digital: ${body.guias[0].codigo_remision} - llamada: ${body.id_llamada}`);
    const respuesta = await pinGuiaService.guardarPinGuia(body);
    reply.status(200).send({ ...respuesta });
};

export const validarPinGuia = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const { id } = req;
    const data = validateData<IGuiaPinIn>(consultarPinGuiaSchema, req.body);
    const response = await pinGuiaService.validarPinGuia(data);
    return reply.send({ ...response, id });
};

export const recuperarPinGuia = async (_req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const guia = validateData<IDataEnvioIn>(IDataEnvioSchema, _req.body);
    const { id } = _req;
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

export const consultarGuiaTracking = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    //const body = validateDataPubSub<IDataInTrigger>(guardarPinGuiaTriggerSchema, req.body);
    const guia = req.params as IGuiaIn;
    const respuesta = await pinGuiaService.consultarGuiaTracking(guia.guia);
    reply.status(200).send({ ...respuesta });
};
