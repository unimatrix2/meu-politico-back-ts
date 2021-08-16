import { NextFunction, Response } from 'express';
import AppError from '../errors/AppError';
import { verify } from '../utils/tokenManager';

export const routeProtection = (req: any, res: Response, nxt: NextFunction) => {
    const { token } = req.signedCookies;

    if (!token) {
        throw new AppError({
            message: 'Não há credenciais de acesso, ou as credenciais são inválidas',
            type: 'Acesso-Credencial-Invalida-Ou-Inexistente',
            status: 401
        });
    }

    let decodedToken;

    try {
        decodedToken = verify(token);
        req.user = { id: decodedToken.id };
    } catch (error) {
        throw new AppError({
            message: 'Acesso expirado',
            type: 'Acesso-Expirado',
            status: 401
        });
    }
    return nxt();
}