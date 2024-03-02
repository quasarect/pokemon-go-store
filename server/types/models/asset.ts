import { ObjectId } from 'mongoose';

export interface IAsset {
	media: object;
	assetType: AssetTypes;
	price: number;
	info: any;
	private: any;
	display: any;
	available: boolean;
	soldTo: ObjectId;
	transaction: ObjectId;
	isFav: boolean;
	count: number;
	approved: boolean;
	rejected: boolean;
	assetOwner: ObjectId;
}

export enum AssetTypes {
	pogo_account = 'account',
	pg_sharp = 'pgsharp',
}
