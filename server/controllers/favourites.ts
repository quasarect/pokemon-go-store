import mongoose from 'mongoose';
import userModel from '../models/user';
import { IRequest } from '../types/IRequest';
import { RequestHandler } from 'express';
import { IError } from '../types/IError';

export const addToFavourite: RequestHandler = async (
	req: IRequest,
	res,
	next,
) => {
	try {
		const { assetId } = req.query;
		const userId = req.user?.id;
		if (!mongoose.Types.ObjectId.isValid(assetId as string)) {
			throw new IError('Invalid AssetId', 400);
		}
		await userModel.findByIdAndUpdate(userId, {
			$push: { favourites: assetId },
		});
	} catch (error) {
		next(error);
	}
};

export const removeFromFavourite: RequestHandler = async (
	req: IRequest,
	res,
	next,
) => {
	try {
		const { assetId } = req.query;
		const userId = req.user?.id;
		if (!mongoose.Types.ObjectId.isValid(assetId as string)) {
			throw new IError('Invalid AssetId', 400);
		}
		await userModel.findByIdAndUpdate(userId, {
			$pull: { favourites: assetId },
		});
	} catch (error) {
		next(error);
	}
};

export const getFavourites: RequestHandler = async (
	req: IRequest,
	res,
	next,
) => {
	try {
		const userId = req.user?.id;
		const favourites = await userModel.findById(userId).populate('favourites');
		
		res.status(200).json({ favourites:favourites?.favourites });
	} catch (error) {
		next(error);
	}
};
