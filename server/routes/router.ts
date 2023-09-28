import { NextFunction, Request, Response, Router } from 'express';
import authRouter from './auth';
import { IError } from '../types/IError';

const router = Router();

router.use('/auth', authRouter);

router.use(
	(error: IError, req: Request, res: Response, next: NextFunction): void => {
		console.error(error);
		res
			.status(error.code || 500)
			.json({ message: error.text || 'Internal server error' });
	},
);

export default router;
