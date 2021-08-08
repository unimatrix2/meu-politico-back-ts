import { routeProtection } from './../../middlewares/routeProtection';
import { Router } from 'express';
import AppError from '../../errors/AppError';
// import * as noticiasService from '../../services/noticia.service';

const router = Router();

// Início das rotas públicas
/* router.get('/buscar', async (req, res, next) => {
    try {
      const { busca } = req.query;
      const noticias = await noticiasService.search(busca);
  
      return res.status(200).json(noticias);
    } catch (error) {
      return next(new AppError(error));
    }
});

router.get('/lista/:id', async (req, res, nxt) => {
    try {
        const { id } = req.params;
        const noticia = await noticiasService.getOne(id);
        return res.status(200).json(noticia);
    } catch (error) { return nxt(new AppError(error)) };
}); */

// Início das rotas privadas
/* router.use(routeProtection);

router.post('/criar', async (req, res, next) => {
    try {
        const { id } = req.user;
        const newNoticia = req.body;

        await noticiasService.create(newNoticia, id);

        return res.status(201).json();
    } catch (error) { return next(new AppError(error)) };
});

router.put('/editar/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateObject = req.body;
        await noticiasService.updateOne(updateObject, id);

        return res.status(200).json();
    } catch (error) { return next(new AppError(error)) };
});

router.get('/lista', async (req, res, nxt) => {
    try {
        const { id } = req.user;
        const noticias = await noticiasService.userList(id);
        return res.status(200).json(noticias)
    } catch (error) { return nxt(new AppError(error)) };
}) */

export default router;
