import { NextFunction, Response, Router } from 'express';
import { validateSignupParams, validateLoginParams } from '../../middlewares/authValidation';
import {
    register,
    updateUserInfo ,
    authenticateUser,
    provideNewSessionInfo
} from '../../services/auth.service';
import { routeProtection } from '../../middlewares/routeProtection';
import { newCredentials } from '../../interfaces/user';

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
        res.cookie('token', loggedUser, {
            secure: true,
            signed: true,
            httpOnly: true,
            sameSite: true,
            maxAge: process.env.COOKIE_EXPIRY
        }).status(200).json({ message: 'Sucesso!' });
    } catch (error: any) {
        res.status(error.status).json(error);
    };
});

router.use(routeProtection);

router.get('/token', async (req: any, res: Response, nxt: NextFunction) => {
    try {
        const user: newCredentials = await provideNewSessionInfo(req.user.id);
        res.status(200).cookie(
            'token', user.newToken, {
                secure: true,
                signed: true,
                httpOnly: true,
                sameSite: true,
                maxAge: process.env.COOKIE_EXPIRY
            }).json(user.userData);
    } catch (error: any) {
        res.status(error.status).clearCookie('token').json(error);
    }
});

router.post('/update/info', async (req: any, res: Response) => {
    try {
        const updatedUser = await updateUserInfo(req.body);
        res.status(200).cookie(
            'token',
            updatedUser.newToken, {
                secure: true,
                signed: true,
                httpOnly: true,
                sameSite: true,
                maxAge: process.env.COOKIE_EXPIRY
            }).json(updatedUser.userData);
    } catch (error: any) {
        res.status(error.status).json(error);
    }
})

// ESSA ROTA SERÁ RETRABALHADA PARA PROVER SOMENTE ATUALIZAÇÃO DE INFO
// E UMA OUTRA ROTA PROVERÁ A ATUALIZAÇÃO DE SENHA
/* router.put('/privado/atualizar', async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user;
        const updatedUser = req.body
        const user = await authService.updateUser(updatedUser, id);
        res.status(200).json();
    } catch (error) { return next(new AppError(error)) }
}) */

export default router;