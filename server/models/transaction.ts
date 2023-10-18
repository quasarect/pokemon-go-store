import mongoose, { Schema, model } from 'mongoose';
import {
	ITransactions,
	ManualTransaction,
	PaymentMethods,
	TransactionState,
} from '../types/models/transaction';

const manualTransaction = new Schema<ManualTransaction>(
	{
		approved: {
			type: Boolean,
			required: true,
			default: false,
		},
		approvalTime: {
			type: Date,
			required: false,
		},
	},
	{ _id: false },
);

const transactionSchema = new Schema<ITransactions>(
	{
		amount: {
			type: Number,
			required: true,
		},
		method: {
			type: String,
			enum: PaymentMethods,
			required: true,
		},
		state: {
			type: String,
			enum: TransactionState,
			required: true,
		},
		from: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		razorpayId: {
			type: String,
			unique: true,
		},
		manualTransaction: manualTransaction,
	},
	{ timestamps: true },
);

const transactionModel = model<ITransactions>('transaction', transactionSchema);

export default transactionModel;
