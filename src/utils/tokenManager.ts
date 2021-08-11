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

export const generate = (id: string): string => {
    const token = jwt.sign(
        { id },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION }
    );
    return token;
}