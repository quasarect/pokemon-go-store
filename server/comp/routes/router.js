"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const assets_1 = __importDefault(require("./assets"));
const transaction_1 = __importDefault(require("./transaction"));
const user_1 = __importDefault(require("./user"));
const router = (0, express_1.Router)();
router.use('/auth', auth_1.default);
router.use('/asset', assets_1.default);
router.use('/transaction', transaction_1.default);
router.use('/user', user_1.default);
router.use((error, req, res, next) => {
    console.error(error);
    res
        .status(error.code || 500)
        .json({ message: error.text || 'Internal server error' });
});
exports.default = router;
//# sourceMappingURL=router.js.map