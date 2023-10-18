import { Router } from 'express';
import { isAuth } from '../middlewares/auth';
import {
	addToFavourite,
	getFavourites,
	removeFromFavourite,
} from '../controllers/favourites';

const favouriteRouter = Router();

favouriteRouter.get('/', isAuth, getFavourites);

favouriteRouter.post('/add', isAuth, addToFavourite);

favouriteRouter.post('/remove', isAuth, removeFromFavourite);

export default favouriteRouter;
