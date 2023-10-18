import { ObjectId } from 'mongoose';

export interface ITransactions {
	amount: number;
	method: PaymentMethods;
	state: TransactionState;
	from: ObjectId;
	razorpayId: string;
	manualTransaction: ManualTransaction;
}

export enum PaymentMethods {
	razorpay = 'razorpay',
	manual = 'manual',
}

export enum TransactionState {
	inProgress = 'inProgress',
	completed = 'completed',
	cancelled = 'cancelled',
}

export interface ManualTransaction {
	approved: boolean;
	approvalTime: Date;
}
