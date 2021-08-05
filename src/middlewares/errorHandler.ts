import { Request, Response } from 'express'
import AppError from '../errors/AppError';

export const handleError = (err: AppError, req: Request, res: Response) => {
	console.log(err);
	const { message, type, status } = err;
	const statusCode = status || 500;

	return res.status(statusCode).json({ message, type: type || '', status: statusCode });
}

export const handle404 = (req: Request, res: Response) => {
    res.status(404).json({
        name: 'Page404',
        url: req.url,
        message: 'Service not found',
        status: 404
    });
}