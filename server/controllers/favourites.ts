import userModel from '../models/user';
import { IRequest } from '../types/IRequest';
import { RequestHandler } from 'express';
import { IError } from '../types/IError';
import { AssetTypes } from '../types/models/asset';
import assetModel from '../models/asset';

export const addToFavourite: RequestHandler = async (
	req: IRequest,
	res,
	next,
) => {
	try {
		const { assetId } = req.query;
		const userId = req.user?.id;
		const asset = await assetModel.findById(assetId);
		if (!asset) {
			throw new IError('Asset Not found', 404);
		}
		await userModel.findByIdAndUpdate(userId, {
			$push: { favourites: assetId },
		});
		res.status(200).json({ message: 'Added successfully' });
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
		const asset = await assetModel.findById(assetId);
		if (!asset) {
			throw new IError('Asset Not found', 404);
		}
		await userModel.findByIdAndUpdate(userId, {
			$pull: { favourites: assetId },
		});
		res.status(200).json({ message: 'Removed successfully' });
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
			return favourite.assetType === AssetTypes.pogo_account;
		});
		const pgsharpFavourites = favourites?.favourites.filter((favourite) => {
			//@ts-ignore
			return favourite.assetType === AssetTypes.pg_sharp;
		});
		console.log(
			(accountFavourites?.length || 0) + (pgsharpFavourites?.length || 0),
		),
			console.log(favourites?.favourites.length || 0);
		while (
			(accountFavourites?.length || 0) + (pgsharpFavourites?.length || 0) <
			(favourites?.favourites.length || 0)
		) {
			//Do nothing
		}
		console.log(accountFavourites);
		console.log("While passed");
		console.log(pgsharpFavourites);
		res
			.status(200)
			.json({ accounts: accountFavourites, pgsharp: pgsharpFavourites });
	} catch (error) {
		next(error);
	}
};
