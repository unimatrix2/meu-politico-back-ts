import AppError from '../errors/AppError';
import { politicoCreateBody } from '../interfaces/politico';
import { create } from '../repositories/politico.repository';

export const createPolitico = async (body: politicoCreateBody) => {
    try {
        await create(body);
        return;
    } catch (err: any) { throw new AppError(err) }
};
