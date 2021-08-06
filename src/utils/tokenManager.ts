import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';

export const verify = (token: string): any => {
    try {
        const verified =  jwt.verify(token, process.env.TOKEN_SECRET);
        return verified;
    } catch (error) {
        throw new AppError(
            'Token Inválido',
            'Acesso-Token-Inválido',
            401
        );
    }
};