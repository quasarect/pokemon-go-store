import mongoose, { Schema, model } from 'mongoose';
import { AssetTypes, IAsset } from '../types/models/asset';

const assetSchema = new Schema<IAsset>(
	{
		assetOwner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},

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
		private: {
			type: Schema.Types.Mixed,
		},
		display: {
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
		count: {
			type: Number,
			default: 1,
			required: true,
		},
		approved: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

const assetModel = model<IAsset>('asset', assetSchema);

export default assetModel;
