import { Router } from 'express';
import { isAdmin, isAuth } from '../middlewares/auth';
import {
	createAsset,
	deleteAsset,
	getAssetById,
	getAssetsByType,
	queryAssets,
	soldAssets,
	updateAssest,
} from '../controllers/asset';
import { fileUpload } from '../middlewares/file-upload';

const assetRouter = Router();

assetRouter.post('/create', isAuth, isAdmin, fileUpload, createAsset);

assetRouter.delete('/', isAuth, isAdmin, deleteAsset);

assetRouter.patch('/', isAuth, isAdmin, fileUpload, updateAssest);

assetRouter.get('/:assetId', isAuth, getAssetById);

assetRouter.get('/:assetType', isAuth, getAssetsByType);

assetRouter.get('/sold', isAuth, isAdmin, soldAssets);

assetRouter.get('/query', isAuth, queryAssets);

export default assetRouter;
