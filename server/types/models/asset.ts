import { ObjectId } from 'mongoose';

export interface IAsset {
	media: Array<string>;
	type: AssetTypes;
	price: Number;
	info: any;
	available: boolean;
	soldTo: ObjectId;
}

export enum AssetTypes {
	pogo_account = 'account',
	pg_sharp = 'pgsharp',
}
