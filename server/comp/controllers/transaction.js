"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manualTransaction = exports.razorpayTransactionCancelled = exports.verify = exports.order = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const transaction_1 = __importDefault(require("../models/transaction"));
const transaction_2 = require("../types/models/transaction");
const IError_1 = require("../types/IError");
const crypto_1 = __importDefault(require("crypto"));
const user_1 = __importDefault(require("../models/user"));
const order = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
        const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
        const { amount } = req.body;
        if (!amount && !(amount instanceof Number)) {
            throw new IError_1.IError('amount is required', 400);
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            throw new IError_1.IError('User not found', 404);
        }
        const paymentInstance = new razorpay_1.default({
            key_id: razorpayKeyId,
            key_secret: razorpayKeySecret,
        });
        const transaction = new transaction_1.default({
            from: userId,
            amount,
            method: transaction_2.PaymentMethods.razorpay,
            state: transaction_2.TransactionState.inProgress,
        });
        yield transaction.save();
        yield paymentInstance.orders.create({
            amount: amount * 100,
            currency: 'INR',
            receipt: transaction._id.toString(),
            notes: {
                userId: userId === null || userId === void 0 ? void 0 : userId.toString(),
                time: new Date().toString(),
            },
        }, (error, order) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                throw new IError_1.IError('Transaction could not be processed', 500);
            }
            transaction.razorpayId = order.id;
            yield transaction.save();
            res.status(201).json({ message: 'Order created', order });
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.order = order;
const verify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto_1.default
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');
        if (razorpay_signature === expectedSign) {
            const transaction = yield transaction_1.default.findOneAndUpdate({
                razorpayId: razorpay_order_id,
            }, { $set: { state: transaction_2.TransactionState.completed } });
            if (!transaction) {
                throw new IError_1.IError('No  order found', 404);
            }
            const { amount, from } = transaction;
            const user = yield user_1.default.findById(from);
            if (!user) {
                throw new IError_1.IError('User not found', 404);
            }
            user.credits += amount;
            yield user.save();
            res
                .status(200)
                .json({ message: `Payment of amount ${amount} successfull` });
        }
        else {
            throw new IError_1.IError('Invalid Signature', 500);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.verify = verify;
const razorpayTransactionCancelled = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { razorpay_order_id } = req.body;
        const transaction = yield transaction_1.default.findOneAndUpdate({
            razorpayId: razorpay_order_id,
        }, { $set: { state: transaction_2.TransactionState.cancelled } });
        if (!transaction) {
            throw new IError_1.IError('No  order found', 404);
        }
        res.status(200).json({ message: 'Order cancelled' });
    }
    catch (error) {
        next(error);
    }
});
exports.razorpayTransactionCancelled = razorpayTransactionCancelled;
const manualTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        const transaction = new transaction_1.default({
            amount,
            method: transaction_2.PaymentMethods.manual,
            state: transaction_2.TransactionState.inProgress,
        });
        yield transaction.save();
        res
            .status(201)
            .json({ message: 'Transaction created', id: transaction._id.toString() });
    }
    catch (error) {
        next(error);
    }
});
exports.manualTransaction = manualTransaction;
//# sourceMappingURL=transaction.js.map