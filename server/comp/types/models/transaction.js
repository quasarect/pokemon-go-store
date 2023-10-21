"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionState = exports.PaymentMethods = void 0;
var PaymentMethods;
(function (PaymentMethods) {
    PaymentMethods["razorpay"] = "razorpay";
    PaymentMethods["manual"] = "manual";
})(PaymentMethods || (exports.PaymentMethods = PaymentMethods = {}));
var TransactionState;
(function (TransactionState) {
    TransactionState["inProgress"] = "inProgress";
    TransactionState["completed"] = "completed";
    TransactionState["cancelled"] = "cancelled";
})(TransactionState || (exports.TransactionState = TransactionState = {}));
//# sourceMappingURL=transaction.js.map