import { ObjectId } from 'mongoose';

export interface IAsset {
	media: object;
	assetType: AssetTypes;
	price: Number;
	info: any;
	available: boolean;
	soldTo: ObjectId;
	transaction: ObjectId;
	isFav: boolean;
}

export enum AssetTypes {
	pogo_account = 'account',
	pg_sharp = 'pgsharp',
}
