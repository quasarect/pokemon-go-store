import { Request } from 'express';
import { Types } from 'mongoose';

export interface IRequest extends Request {
	user?: { id: string | Types.ObjectId; type: string };
}
