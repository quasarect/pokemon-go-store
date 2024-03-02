import { RequestHandler } from 'express';
import Razorpay from 'razorpay';
import transactionModel from '../models/transaction';
import { IRequest } from '../types/IRequest';
import { PaymentMethods, TransactionState } from '../types/models/transaction';
import { IError } from '../types/IError';
import crypto from 'crypto';
import userModel from '../models/user';
import assetModel from '../models/asset';

export const order: RequestHandler = async (req: IRequest, res, next) => {
	try {
		const razorpayKeyId = process.env.RAZORPAY_KEY_ID!;
		const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET!;
		const { amount } = req.body;
		if (!amount && !(amount instanceof Number)) {
			throw new IError('amount is required', 400);
		}
		const userId = req.user?.id;
		if (!userId) {
			throw new IError('User not found', 404);
		}
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
				amount: amount * 100,
				currency: 'INR',
				receipt: transaction._id.toString(),
				notes: {
					userId: userId?.toString(),
					time: new Date().toString(),
				},
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
			const transaction = await transactionModel.findOneAndUpdate(
				{
					razorpayId: razorpay_order_id,
				},
				{ $set: { state: TransactionState.completed } },
			);
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
			throw new IError('Invalid Signature', 400);
		}
	} catch (error) {
		next(error);
	}
};

export const razorpayTransactionCancelled: RequestHandler = async (
	req,
	res,
	next,
) => {
	try {
		const { razorpay_order_id } = req.body;
		const transaction = await transactionModel.findOneAndUpdate(
			{
				razorpayId: razorpay_order_id,
			},
			{ $set: { state: TransactionState.cancelled } },
		);
		if (!transaction) {
			throw new IError('No  order found', 404);
		}
		res.status(200).json({ message: 'Order cancelled' });
	} catch (error) {
		next(error);
	}
};

export const manualTransaction: RequestHandler = async (req, res, next) => {
	try {
		const { amount } = req.body;
		const transaction = new transactionModel({
			amount,
			method: PaymentMethods.manual,
			state: TransactionState.inProgress,
		});
		await transaction.save();
		res
			.status(201)
			.json({ message: 'Transaction created', id: transaction._id.toString() });
	} catch (error) {
		next(error);
	}
};

export const buyAsset: RequestHandler = async (req: IRequest, res, next) => {
	try {
		const assetId = req.params.assetId;
		const userId = req.user?.id;
		const asset = await assetModel.findById(assetId);
		if (!asset) {
			throw new IError('Asset not found', 404);
		}
		if (asset.count === 0) {
			throw new IError('Asset not available', 404);
		}
		if (asset.count > 0) {
			asset.count -= 1;
		}
		if (asset.count === 0) {
			asset.available = false;
		}
		const user = await userModel.findById(userId);
		if (!user) {
			throw new IError('User not found', 404);
		}
		if (user.credits < asset.price) {
			throw new IError('Insufficient credits', 400);
		}
		await userModel.findByIdAndUpdate(userId, {
			$push: { assets: assetId },
			$inc: { credits: -asset.price },
		});
		await asset.save();
		res.status(200).json({ message: 'Asset bought' });
	} catch (error) {
		next(error);
	}
};
