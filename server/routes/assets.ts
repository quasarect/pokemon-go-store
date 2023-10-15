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

assetRouter.post('/create', fileUpload, createAsset);

assetRouter.delete('/', isAuth, isAdmin, deleteAsset);

assetRouter.patch('/', isAuth, isAdmin, fileUpload, updateAssest);

assetRouter.get('/:assetId/id', isAuth, getAssetById);

assetRouter.get('/:assetType/all', isAuth, getAssetsByType);

assetRouter.get('/sold/:assetType', isAuth, isAdmin, soldAssets);

assetRouter.post('/query', isAuth, queryAssets);

export default assetRouter;
