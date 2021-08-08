import { NextFunction, Response } from 'express';
import AppError from '../errors/AppError';
import { verify } from '../utils/tokenManager';

export const routeProtection = (req: any, res: Response, nxt: NextFunction) => {
    const { token } = req.signedCookies;

    if (!token) {
        throw new AppError(
            'Não há credenciais de acesso, ou as credenciais são inválidas',
            'Acesso-Credencial-Invalida-Ou-Inexistente',
            401
        );
    }

    let decodedToken;

    try {
        decodedToken = verify(token);
        req.user = { id: decodedToken.id };
    } catch (error) {
        throw new AppError(
            'Acesso expirado',
            'Acesso-Expirado',
            401
        );
    }
    return nxt();
}