import { Router } from 'express';
import { getUserDetails, isAdmin, isAuth } from '../middlewares/auth';
import {
	approveAsset,
	createAsset,
	deleteAsset,
	disapproveAsset,
	getAssetById,
	getAssetsByType,
	getBoughtAssets,
	getGlobalSearch,
	getListOfPendingApprovalAssets,
	getUploadedAssets,
	queryAssets,
	soldAssets,
	updateAssest,
} from '../controllers/asset';
import { fileUpload } from '../middlewares/file-upload';
import favouriteRouter from './favourite';

const assetRouter = Router();

assetRouter.post('/create', isAuth, fileUpload, createAsset);

assetRouter.post('/approve', isAuth, isAdmin, approveAsset);

assetRouter.post('/disapprove', isAuth, isAdmin, disapproveAsset);

assetRouter.get(
	'/listunapproved',
	isAuth,
	isAdmin,
	getListOfPendingApprovalAssets,
);

assetRouter.get('/user/uploaded', isAuth, getUploadedAssets);

assetRouter.delete('/', isAuth, isAdmin, deleteAsset);

assetRouter.patch('/', isAuth, isAdmin, fileUpload, updateAssest);

assetRouter.get('/sold/:assetType', isAuth, isAdmin, soldAssets);

assetRouter.get('/:assetId/id', getUserDetails, getAssetById);

assetRouter.get('/:assetType/all', getUserDetails, getAssetsByType);

assetRouter.get('/global', getGlobalSearch);

assetRouter.post('/query', getUserDetails, queryAssets);

assetRouter.use('/favourite', favouriteRouter);

assetRouter.get('/bought', isAuth, getBoughtAssets);

export default assetRouter;
