import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { consultarPinGuiaSchema, guardarPinGuiaSchema, IDataEnvioSchema, validateData } from '../util';
import { PinGuiaService } from '@application/services';
import { IDataIn, IGuiaPinIn, IGuiaIn, IDataEnvioPin } from '@application/data';

export const guardarPinGuia = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const body = validateData<IDataIn>(guardarPinGuiaSchema, req.body);
    const guia = body.guias[0].codigo_remision;
    console.log(`Guardando el pin de guia digital: ${guia} - llamada: ${body.id_llamada}`);
    const respuesta = await pinGuiaService.guardarPinGuia(body);
    reply.status(200).send({ ...respuesta });
};

export const validarPinGuia = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const data = validateData<IGuiaPinIn>(consultarPinGuiaSchema, req.body);
    const response = await pinGuiaService.validarPinGuia(data);
    return reply.send({ ...response, id: req.id });
};

export const recuperarPinGuia = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const guia = validateData<IDataEnvioPin>(IDataEnvioSchema, req.body);
    const response = await pinGuiaService.recuperarPin(guia);
    return reply.send({ ...response, id: req.id });
};

export const consultarFormaEnvio = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    const data = validateData<IGuiaIn>(IDataEnvioSchema, req.body);
    const response = await pinGuiaService.recuperarDataEnvio(data);
    return reply.send({ ...response, id: req.id });
};

export const consultarGuiaTracking = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pinGuiaService = DEPENDENCY_CONTAINER.get(PinGuiaService);
    //const body = validateDataPubSub<IDataInTrigger>(guardarPinGuiaTriggerSchema, req.body);
    const guia = req.params as IGuiaIn;
    const respuesta = await pinGuiaService.consultarGuiaTracking(guia.guia);
    reply.status(200).send({ ...respuesta });
};
