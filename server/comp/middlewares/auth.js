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
exports.getUserDetails = exports.generateToken = exports.isAdmin = exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const IError_1 = require("../types/IError");
const Admins_1 = require("../types/Admins");
function isAuth(req, res, next) {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return new IError_1.IError('Token not found', 401);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (e) {
        throw new IError_1.IError('Invalid token', 401);
    }
}
exports.isAuth = isAuth;
function isAdmin(req, res, next) {
    var _a;
    try {
        if (Object.values(Admins_1.Admins).includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.email)) {
            console.log('Admin');
            next();
        }
        throw new IError_1.IError('Not admin', 401);
    }
    catch (error) {
        next(error);
    }
}
exports.isAdmin = isAdmin;
function generateToken(id, email) {
    const user = { id, email };
    const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}
exports.generateToken = generateToken;
const getUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return next();
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    }
    catch (e) {
    }
    finally {
        next();
    }
});
exports.getUserDetails = getUserDetails;
//# sourceMappingURL=auth.js.map