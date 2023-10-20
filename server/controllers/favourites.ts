import mongoose from 'mongoose';
import userModel from '../models/user';
import { IRequest } from '../types/IRequest';
import { RequestHandler } from 'express';
import { IError } from '../types/IError';
import { AssetTypes } from '../types/models/asset';

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
		const accountFavourites = favourites?.favourites.filter((favourite) => {
			//@ts-ignore
			return (favourite.assetType = AssetTypes.pogo_account);
		});
		const pgsharpFavourites = favourites?.favourites.filter((favourite) => {
			//@ts-ignore
			return (favourite.assetType = AssetTypes.pg_sharp);
		});
		while (
			(accountFavourites?.length || 0) + (pgsharpFavourites?.length || 0) ===
			(favourites?.favourites.length || 0)
		) {
			//Do nothing
		}
		res
			.status(200)
			.json({ accounts: accountFavourites, pgsharp: pgsharpFavourites });
	} catch (error) {
		next(error);
	}
};
