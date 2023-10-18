import { Router } from 'express';
import { isAuth } from '../middlewares/auth';
import { getUserDetails } from '../controllers/user';

const userRouter = Router();

userRouter.get('/details', isAuth, getUserDetails);

export default userRouter;
