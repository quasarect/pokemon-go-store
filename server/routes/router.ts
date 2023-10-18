import { NextFunction, Request, Response, Router } from 'express';
import authRouter from './auth';
import { IError } from '../types/IError';
import assetRouter from './assets';
import transactionRouter from './transaction';
import userRouter from './user';

const router = Router();

router.use('/auth', authRouter);

router.use('/asset', assetRouter);

router.use('/transaction', transactionRouter);

router.use('/user', userRouter);

router.use(
	(error: IError, req: Request, res: Response, next: NextFunction): void => {
		console.error(error);
		res
			.status(error.code || 500)
			.json({ message: error.text || 'Internal server error' });
	},
);

export default router;
