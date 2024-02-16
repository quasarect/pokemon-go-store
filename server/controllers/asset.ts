import { RequestHandler } from 'express';
import { IError } from '../types/IError';
import assetModel from '../models/asset';
import { AssetTypes } from '../types/models/asset';
import { IRequest } from '../types/IRequest';
import userModel from '../models/user';
import mongoose from 'mongoose';

export const createAsset: RequestHandler = async (req, res, next) => {
	try {
		const { files, assetType, price, info, display, privateDetails } = req.body;
		if (!assetType && !price) {
			throw new IError('Price and type is required', 400);
		}
		const asset = new assetModel({
			media: files,
			assetType,
			price,
			info: JSON.parse(info),
			display: JSON.parse(display),
			private: JSON.parse(privateDetails),
		});
		await asset.save();
		res.status(200).json({ message: 'Asset created' });
	} catch (error) {
		next(error);
	}
};

export const updateAssest: RequestHandler = async (req, res, next) => {
	try {
		const { files, price, info, assetId, display, privateDetails } = req.body;
		if (!files && !price && !info) {
			throw new IError('Nothing to update', 400);
		}
		await assetModel.findByIdAndUpdate(assetId, {
			$set: { media: files, price, info, display, private: privateDetails },
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

export const getAssetById: RequestHandler = async (
	req: IRequest,
	res,
	next,
) => {
	try {
		const { assetId } = req.params;
		let Private: boolean = false;
		const userId = req.user?.id;
		if (userId) {
			const userAssets = await userModel.findOne({
				_id: userId,
				assets: new mongoose.Types.ObjectId(assetId),
			});
			if (userAssets) {
				Private = true;
			}
		}
		const selectObject = Private ? '' : '-private';
		const asset = await assetModel.findById(assetId).select(selectObject);
		res.status(200).json(asset);
	} catch (error) {
		next(error);
	}
};

export const getAssetsByType: RequestHandler = async (
	req: IRequest,
	res,
	next,
) => {
	try {
		const { assetType } = req.params;
		const userId = req.user?.id;
		if (!Object.values(AssetTypes).includes(assetType as AssetTypes)) {
			throw new IError('AssetTyoe not valid', 400);
		}
		const assets = await assetModel.find({ assetType, available: true }).select('-private');
		let newAssets: Array<any> = [];
		if (userId) {
			const userFavourites = await userModel
				.findById(userId)
				.populate('favourites');
			if (userFavourites?.favourites) {
				assets.forEach((asset) => {
					const isFav = userFavourites.favourites.some((favorite) =>
						//@ts-ignore
						favorite._id.equals(asset._id.toString()),
					);
					// Add the isFav attribute to the asset object
					console.log(asset._id, isFav);
					//@ts-ignore
					newAssets.push({ ...asset._doc, isFav });
				});
			}
		}
		const respAssets = newAssets.length > 0 ? newAssets : assets;
		//@ts-ignore
		res.status(200).json({ assets: respAssets });
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
			$text: { $search: text },
		});
	} catch (error) {
		next(error);
	}
};

export const getBoughtAssets: RequestHandler = async (
	req: IRequest,
	res,
	next,
) => {
	try {
		const userId = req.user?.id;
		const user = await userModel.findById(userId).populate('assets');
		const accounts = user?.assets.filter((asset) => {
			//@ts-ignore
			return asset.assetType === AssetTypes.pogo_account;
		});
		const pgsharp = user?.assets.filter((asset) => {
			//@ts-ignore
			return asset.assetType === AssetTypes.pg_sharp;
		});
		while (
			(accounts?.length || 0) + (pgsharp?.length || 0) <
			(user?.assets.length || 0)
		) {
			//Do nothing
		}
		res.status(200).json({ accounts, pgsharp });
	} catch (error) {
		next(error);
	}
};
