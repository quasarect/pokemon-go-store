import { RequestHandler } from 'express';
import { IError } from '../types/IError';
import assetModel from '../models/asset';
import { AssetTypes } from '../types/models/asset';

export const createAsset: RequestHandler = async (req, res, next) => {
	try {
		const { files, assetType, price, info } = req.body;
		if (!assetType && !price) {
			throw new IError('Price and type is required', 400);
		}
		const asset = new assetModel({
			media: files,
			assetType,
			price,
			info: JSON.parse(info),
		});
		await asset.save();
		res.status(200).json({ message: 'Asset created' });
	} catch (error) {
		next(error);
	}
};

export const updateAssest: RequestHandler = async (req, res, next) => {
	try {
		const { files, price, info, assetId } = req.body;
		if (!files && !price && !info) {
			throw new IError('Nothing to update', 400);
		}
		await assetModel.findByIdAndUpdate(assetId, {
			$set: { media: files, price, info },
		});
		res.status(200).json({ message: `${assetId} updated successfully ` });
	} catch (error) {
		next(error);
	}
};

export const deleteAsset: RequestHandler = async (req, res, next) => {
	try {
		const { assetId } = req.body;
		await assetModel.findByIdAndDelete(assetId);
		res.status(200).json({ message: `${assetId} deleted successfully` });
	} catch (error) {
		next(error);
	}
};

export const getAssetById: RequestHandler = async (req, res, next) => {
	try {
		const { assetId } = req.params;
		const asset = await assetModel.findById(assetId);
		res.status(200).json(asset);
	} catch (error) {
		next(error);
	}
};

export const getAssetsByType: RequestHandler = async (req, res, next) => {
	try {
		const { assetType } = req.params;
		if (!Object.values(AssetTypes).includes(assetType as AssetTypes)) {
			throw new IError('AssetTyoe not valid', 400);
		}
		const assets = await assetModel.find({ assetType, available: true });
		res.status(200).json(assets);
	} catch (error) {
		next(error);
	}
};

export const queryAssets: RequestHandler = async (req, res, next) => {
	try {
		const { assetType, query, price, priceOperator } = req.body;
		if (!Object.values(AssetTypes).includes(assetType as AssetTypes)) {
			throw new IError('AssetType not valid', 400);
		}
		const queryObject: any = { available: true };

		if (assetType) {
			queryObject.assetType = assetType;
		}
		if (query) {
			queryObject.info = query;
		}
		if (price && priceOperator) {
			switch (priceOperator) {
				case 'greaterThan':
					queryObject.price = { $gt: price };
					break;
				case 'lessThan':
					queryObject.price = { $lt: price };
					break;
				default:
					break;
			}
		}

		const assets = await assetModel.find(queryObject);
		res.status(200).json(assets);
	} catch (error) {
		next(error);
	}
};

export const soldAssets: RequestHandler = async (req, res, next) => {
	try {
		const { assetType } = req.params;
		const assets = await assetModel.find({ soldTo: { $ne: null }, assetType });

		if (!assets || assets.length === 0) {
			return res.status(404).json({ message: 'No sold assets found.' });
		}

		res.status(200).json(assets);
	} catch (error) {
		next(error);
	}
};

export const getGlobalSearch: RequestHandler = async (req, res, next) => {
	try {
		const { assetType, text } = req.params;
		if (!Object.values(AssetTypes).includes(assetType as AssetTypes)) {
			throw new IError('AssetTyoe not valid', 400);
		}
		await assetModel.find({
			assetType,
			$or: [{ price: { $eq: parseInt(text) } }],
		});
	} catch (error) {
		next(error);
	}
};
