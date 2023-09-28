import { Router } from 'express';
import { facebookLogin, googleLogin, login, signup } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/login', login);

authRouter.post('/signup', signup);

authRouter.post('/google', googleLogin);

authRouter.post('/facebook', facebookLogin);

export default authRouter;
