import { RequestHandler } from 'express';
import Razorpay from 'razorpay';
import transactionModel from '../models/transaction';
import { IRequest } from '../types/IRequest';
import { PaymentMethods, TransactionState } from '../types/models/transaction';
import { IError } from '../types/IError';
import crypto from 'crypto';
import userModel from '../models/user';

const razorpayKeyId = process.env.RAZORPAY_KEY_ID!;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET!;

export const order: RequestHandler = async (req: IRequest, res, next) => {
	try {
		const { amount } = req.body;
		if (!amount && !(amount instanceof Number)) {
			throw new IError('amount is required', 400);
		}
		const userId = req.user?.id;
		const paymentInstance = new Razorpay({
			key_id: razorpayKeyId,
			key_secret: razorpayKeySecret,
		});
		const transaction = new transactionModel({
			from: userId,
			amount,
			method: PaymentMethods.razorpay,
			state: TransactionState.inProgress,
		});
		await transaction.save();
		await paymentInstance.orders.create(
			{
				amount: 5,
				currency: 'INR',
				receipt: transaction._id.toString(),
			},
			async (error, order) => {
				if (error) {
					throw new IError('Transaction could not be processed', 500);
				}
				transaction.razorpayId = order.id;
				await transaction.save();
				res.status(201).json({ message: 'Order created', order });
			},
		);
	} catch (error) {
		next(error);
	}
};

export const verify: RequestHandler = async (req, res, next) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;

		const sign = razorpay_order_id + '|' + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
			.update(sign.toString())
			.digest('hex');
		if (razorpay_signature === expectedSign) {
			const transaction = await transactionModel.findOne({
				razorpayId: razorpay_order_id,
			});
			if (!transaction) {
				throw new IError('No  order found', 404);
			}
			const { amount, from } = transaction;
			const user = await userModel.findById(from);
			if (!user) {
				throw new IError('User not found', 404);
			}
			user.credits += amount;
			await user.save();
			res
				.status(200)
				.json({ message: `Payment of amount ${amount} successfull` });
		} else {
			throw new IError('Invalid Signature', 500);
		}
	} catch (error) {
		next(error);
	}
};
