import { RequestHandler } from 'express';
import { IRequest } from '../types/IRequest';
import userModel from '../models/user';
import { IError } from '../types/IError';

export const getUserDetails: RequestHandler = async (
	req: IRequest,
	res,
	next,
) => {
	try {
		const userId = req.user?.id;
		const user = await userModel
			.findById(userId)
			.select(
				'-password -authType -oauthCredentials -favourites -createdAt -updatedAt -__v',
			);
		if (!user) {
			throw new IError('User not found', 404);
		}
		res.status(200).json({ user });
	} catch (error) {
		next(error);
	}
};
