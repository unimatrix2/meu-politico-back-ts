import { NextFunction, Response, Router } from 'express';
import { validateSignupParams, validateLoginParams } from '../../middlewares/authValidation';
import {
	register,
	updateUserInfo,
	authenticateUser,
	updateUserPassword,
	provideNewSessionInfo
} from '../../services/auth.service';
import { routeProtection } from '../../middlewares/routeProtection';
import { newCredentials } from '../../interfaces/user';
import AppError from '../../errors/AppError';

const router = Router();

router.post('/registro', validateSignupParams, async (req: any, res: Response, next: NextFunction) => {
	try {
		const { body } = req;
		await register(body);
		res.status(201).json({ message: 'Usuário criado com sucesso!' });
	} catch (error: any) {
		res.status(error.status).json(error);
	}
});

router.post('/acesso', validateLoginParams, async (req: any, res: Response, next: NextFunction) => {
	try {
		const { body } = req;
		const loggedUser = await authenticateUser(body);
		res.cookie('token', loggedUser?.newToken, {
			secure: true,
			signed: true,
			httpOnly: true,
			sameSite: 'none',
			maxAge: process.env.COOKIE_EXPIRY
		}).status(200).json(loggedUser?.userData);
	} catch (error: any) {
		res.status(error.status).json(error);
	};
});

router.use(routeProtection);

router.get('/acesso', async (req: any, res: Response, nxt: NextFunction) => {
	try {
		const user: newCredentials = await provideNewSessionInfo(req.user.id);
		res.status(200).cookie('token', user.newToken, {
			secure: true,
			signed: true,
			httpOnly: true,
			sameSite: 'none',
			maxAge: process.env.COOKIE_EXPIRY
		}).json(user.userData);
	} catch (error: any) {
		res.status(error.status).json(new AppError(error));
	}
});

router.patch('/atualizar/dados', async (req: any, res: Response) => {
	try {
		const updatedUser = await updateUserInfo(req.body);
		res.status(200).cookie('token', updatedUser.newToken, {
			secure: true,
			signed: true,
			httpOnly: true,
			sameSite: 'none',
			maxAge: process.env.COOKIE_EXPIRY
		}).json(updatedUser.userData);
	} catch (error: any) {
		res.status(error.status).json(new AppError(error));
	}
});

router.patch('/atualizar/senha', async (req: any, res: Response) => {
	try {
		await updateUserPassword(req.body);
		res.status(200).json({ message: 'Senha atualizada com sucesso!' });
	} catch (error: any) {
		res.status(error.status).json(new AppError(error));
	}
});

router.get('/logout', (req: any, res: Response) => {
	res.clearCookie('token').status(200).json({ message: 'Sessão finalizada com sucesso!' })
})

export default router;