import { NextFunction, Request, Response } from 'express';

import AppError from '../errors/AppError';
import { verify } from '../utils/tokenManager';
import { verify as removeLayer } from '../utils/passwordManager';

export const routeProtection = async (req: any, res: Response, nxt: NextFunction) => {
	try {
		const token = req.headers.authorization;
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