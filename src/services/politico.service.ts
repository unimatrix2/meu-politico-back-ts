import privilegesEnum from '../constants/privileges.enum';
import AppError from '../errors/AppError';
import { politicoCreateBody } from '../interfaces/politico';
import { create } from '../repositories/politico.repository';
import { checkUserPrivileges } from './auth.service';

export const createPolitico = async (body: politicoCreateBody) => {
    try {
        if (body.status && body.status !== 'publicar') {
            const authorization = await checkUserPrivileges(
                body.owner,
                privilegesEnum[1],
                privilegesEnum[2]
            );
            if (authorization) {
                await create(body);
                return;
            }
            throw new AppError({
                message: 'Usuário não tem permissão para inserir dados sem aprovação',
                type: 'Politico-Criar-Aprovacao',
                status: 401
            });
        }
        await create(body);
        return;
    } catch (err: any) { throw new AppError(err) }
};
