export interface ITransactions {
	amount: number;
	method: PaymentMethods;
	state: TransactionState;
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
