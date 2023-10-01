import { ObjectId } from 'mongoose';

export interface ITransactions {
	amount: number;
	method: PaymentMethods;
	state: TransactionState;
	from: ObjectId;
	razorpayId: string;
}

export enum PaymentMethods {
	razorpay = 'razorpay',
	upi = 'upi',
	manual = 'manual',
}

export enum TransactionState {
	inProgress = 'inProgress',
	completed = 'completed',
	cancelled = 'cancelled',
}
