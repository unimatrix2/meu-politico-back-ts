import { routeProtection } from './../../middlewares/routeProtection';
import { Router } from 'express';

import AppError from '../../errors/AppError';
import * as politicoService from '../../services/politico.service';

const router = Router();

// Início das rotas públicas
router.get('/buscar', async (req, res, next) => {
	try {
			const { busca } = req.query;

			const politicos = await politicoService.search(busca);

			return res.status(200).json(politicos);
	} catch (error) {
			return next(new AppError(error));
}
});

router.get('/lista/:id', async (req, res, next) => {
try {
	const { id } = req.params;

	const noticia = await politicoService.getOne(id);

	return res.status(200).json(noticia);
} catch (error) {
	return next(new AppError(error));
}
});

// Início das rotas privadas
router.use(routeProtection);

router.post('/criar', async (req, res, next) => {
  try {
    const { id } = req.user;
    const newPolitico = req.body; 

    await politicoService.create(newPolitico, id);

    return res.status(201).json();
  } catch (error) {
    return next(new AppError(error));
  }
});

router.get('/lista', async (req, res, nxt) => {
  try {
      const politicos = await politicoService.getAll();
      res.status(200).json(politicos);
  } catch (error) { return nxt(new AppError(error)) };
});


router.put('/editar/:id',  async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateObject = req.body;

    await politicoService.updateOne(updateObject, id);

    return res.status(200).json();
  } catch (error) {
    return next(new AppError(error));
  }
});

export default router;
