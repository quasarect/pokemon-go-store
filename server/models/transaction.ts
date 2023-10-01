import mongoose, { Schema, model } from 'mongoose';
import {
	ITransactions,
	PaymentMethods,
	TransactionState,
} from '../types/models/transaction';

const transactionSchema = new Schema<ITransactions>({
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
});

const transactionModel = model<ITransactions>('transaction', transactionSchema);

export default transactionModel;
