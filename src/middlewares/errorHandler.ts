import { Request, Response } from 'express'

export const handle404 = (req: Request, res: Response) => {
    res.status(404).json({
        name: 'Page404',
        url: req.url,
        message: 'Service not found',
        status: 404
    });
}