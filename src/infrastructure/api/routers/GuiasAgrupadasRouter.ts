import { IConsultaGuiasGrupoIn, IConsultaGuiasRtteIn } from '@application/data';
import { GuiasAgrupadasService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { GuiasRemitenteEntity } from '@domain/entities';
import { FastifyRequest, FastifyReply } from 'fastify';
import { consultarInfoGrupoSchema, consultarInfoRtteSchema, validateData } from '..';

export const guiasRemitente = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const service = DEPENDENCY_CONTAINER.get(GuiasAgrupadasService);
    const { id } = req;
    const data: GuiasRemitenteEntity = validateData<IConsultaGuiasRtteIn>(consultarInfoRtteSchema, req.params);
    const response = await service.consultarInfo(data);
    return reply.send({ ...response, id });
};

export const guiasAgrupadas = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const service = DEPENDENCY_CONTAINER.get(GuiasAgrupadasService);
    const { id } = req;
    console.log(req.query);
    const data = validateData<IConsultaGuiasGrupoIn>(consultarInfoGrupoSchema, req.query);
    const response = await service.consultarGuiasAgrupadas(data);
    return reply.send({ ...response, id });
};
