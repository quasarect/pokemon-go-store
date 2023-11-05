"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_1 = require("../controllers/transaction");
const auth_1 = require("../middlewares/auth");
const transactionRouter = (0, express_1.Router)();
transactionRouter.post('/order', auth_1.isAuth, transaction_1.order);
transactionRouter.post('/verify', auth_1.isAuth, transaction_1.verify);
transactionRouter.post('/manual', auth_1.isAuth, transaction_1.manualTransaction);
transactionRouter.post('/asset/:assetId', auth_1.isAuth, transaction_1.buyAsset);
exports.default = transactionRouter;
//# sourceMappingURL=transaction.js.map