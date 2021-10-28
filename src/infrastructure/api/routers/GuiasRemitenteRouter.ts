import { IConsultaGuiasRtteIn } from '@application/data';
import { GuiasRemitenteService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { GuiasRemitenteEntity } from '@domain/entities';
import { FastifyRequest, FastifyReply } from 'fastify';
import { consultarInfoRtteSchema, validateData } from '..';

export const guiasRemitente = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const guiasRemitenteService = DEPENDENCY_CONTAINER.get(GuiasRemitenteService);
    const { id } = req;
    const data: GuiasRemitenteEntity = validateData<IConsultaGuiasRtteIn>(consultarInfoRtteSchema, req.params);
    const response = await guiasRemitenteService.consultarInfo(data);
    return reply.send({ ...response, id });
};
