import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IError } from '../types/IError';
import { IRequest } from '../types/IRequest';

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
