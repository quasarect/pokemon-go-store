import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IError } from '../types/IError';
import { IRequest } from '../types/IRequest';
import { Admins } from '../types/Admins';

export function isAuth(
	req: IRequest,
	res: Response,
	next: NextFunction,
): unknown {
	const token = req.header('Authorization')?.replace('Bearer ', '');
	if (!token) {
		return new IError('Token not found', 401);
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			id: string;
			email: string;
			type: string;
		};

		req.user = decoded;
		next();
	} catch (e) {
		throw new IError('Invalid token', 401);
	}
}

export function isAdmin(req: IRequest, res: Response, next: NextFunction) {
	try {
		if (Object.values(Admins).includes(req.user?.email as Admins)) {
			console.log('Admin');
			next();
		}
		throw new IError('Not admin', 401);
	} catch (error) {
		next(error);
	}
}
/**
 *
 * @param id userId of the user
 * @param designation designation of the user as in teacher or student (watch casing)
 * @returns token valid for 7 days
 */
export function generateToken(id: string, email: string): string {
	const user = { id, email };
	const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '7d' });
	return token;
}
