import { Router } from 'express';
import { getUserDetails, isAdmin, isAuth } from '../middlewares/auth';
import {
	createAsset,
	deleteAsset,
	getAssetById,
	getAssetsByType,
	getBoughtAssets,
	queryAssets,
	soldAssets,
	updateAssest,
} from '../controllers/asset';
import { fileUpload } from '../middlewares/file-upload';
import favouriteRouter from './favourite';

const assetRouter = Router();

assetRouter.post('/create', isAuth, fileUpload, createAsset);

assetRouter.delete('/', isAuth, isAdmin, deleteAsset);

assetRouter.patch('/', isAuth, isAdmin, fileUpload, updateAssest);

assetRouter.get('/sold/:assetType', isAuth, isAdmin, soldAssets);

assetRouter.get('/:assetId/id', getUserDetails, getAssetById);

assetRouter.get('/:assetType/all', getUserDetails, getAssetsByType);

assetRouter.post('/query', getUserDetails, queryAssets);

assetRouter.use('/favourite', favouriteRouter);

assetRouter.get('/bought', isAuth, getBoughtAssets);

export default assetRouter;
