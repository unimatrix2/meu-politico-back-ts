import { NextFunction, Response } from 'express';
import AppError from '../errors/AppError';
import { verify } from '../utils/tokenManager';

export const routeProtection = (req: any, res: Response, nxt: NextFunction) => {
	try {
		const { token } = req.signedCookies;
		if (!token) {
			throw new AppError({
				message: 'Não há credenciais de acesso',
				type: 'Acesso-Credencial-Inexistente',
				status: 401
			});
		}
		const decodedToken = verify(token);
		req.user = { id: decodedToken.id };
		return nxt();
	} catch (error: any) {
		res
			.clearCookie('token')
			.status(error.status)
			.json(new AppError(error));
	}
}