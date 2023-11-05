import { Router } from 'express';
import {
	buyAsset,
	manualTransaction,
	order,
	verify,
} from '../controllers/transaction';
import { isAuth } from '../middlewares/auth';

const transactionRouter = Router();

transactionRouter.post('/order', isAuth, order);

transactionRouter.post('/verify', isAuth, verify);

transactionRouter.post('/manual', isAuth, manualTransaction);

transactionRouter.post('/asset/:assetId', isAuth, buyAsset);

export default transactionRouter;
