import { Router } from 'express';
import { order, verify } from '../controllers/transaction';

const transactionRouter = Router();

transactionRouter.post('/verify', verify);

transactionRouter.post('/order', order);

export default transactionRouter;
