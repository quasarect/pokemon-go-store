import mongoose, { Schema, model } from 'mongoose';
import { AssetTypes, IAsset } from '../types/models/asset';

const assetSchema = new Schema<IAsset>(
	{
		media: {
			type: Object,
		},

		assetType: {
			type: String,
			enum: AssetTypes,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		info: {
			type: Schema.Types.Mixed,
		},
		available: {
			type: Boolean,
			default: true,
		},
		soldTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
		transaction: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'transaction',
		},
	},
	{ timestamps: true },
);

const assetModel = model<IAsset>('asset', assetSchema);

export default assetModel;
