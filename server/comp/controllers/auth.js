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
exports.facebookLogin = exports.googleLogin = exports.signup = exports.login = void 0;
const IError_1 = require("../types/IError");
const googleapis_1 = require("googleapis");
const axios_1 = __importDefault(require("axios"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../middlewares/auth");
const user_2 = require("../types/models/user");
const adminCheck_1 = require("../middlewares/adminCheck");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            throw new IError_1.IError('User not found', 404);
        }
        if (!user.password) {
            throw new IError_1.IError('Different auth type', 400);
        }
        if (!(yield bcrypt_1.default.compare(password, user.password))) {
            throw new IError_1.IError('Wrong password', 400);
        }
        res.status(200).json({
            message: 'Login successful',
            token: (0, auth_1.generateToken)(user._id.toString(), user.email),
            isAdmin: yield (0, adminCheck_1.checkAdmin)(user.email),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = new user_1.default({
            name,
            email,
            password: bcrypt_1.default.hashSync(password, 10),
            authType: user_2.AuthTypes.password,
        });
        yield user.save();
        res.status(200).json({
            message: 'Signup successful',
            token: (0, auth_1.generateToken)(user._id.toString(), email),
            isAdmin: yield (0, adminCheck_1.checkAdmin)(user.email),
        });
    }
    catch (error) {
        if (error.code === 11000) {
            next(new IError_1.IError('Email already exists', 400));
        }
        next(error);
    }
});
exports.signup = signup;
const googleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URL);
        const { code } = req.body;
        if (!code) {
            throw new IError_1.IError('Code not found', 404);
        }
        const { tokens } = yield oauth2Client.getToken(code);
        const { access_token, refresh_token } = tokens;
        const userInfo = yield axios_1.default.get('https://people.googleapis.com/v1/people/me?personFields=emailAddresses,photos,names', { headers: { Authorization: `Bearer ${access_token}` } });
        const name = (_a = userInfo.data.names.find((name) => name.metadata.primary === true)) === null || _a === void 0 ? void 0 : _a.displayName;
        const profilePhoto = (_b = userInfo.data.photos.find((photo) => photo.metadata.primary === true)) === null || _b === void 0 ? void 0 : _b.url;
        const email = (_c = userInfo.data.emailAddresses.find((email) => email.metadata.primary === true)) === null || _c === void 0 ? void 0 : _c.value;
        let searchUser = yield user_1.default.findOne({ email });
        if (!searchUser) {
            const user = new user_1.default({
                name,
                email,
                profilePhoto,
                authType: user_2.AuthTypes.google,
                oauthCredentials: {
                    accessToken: access_token,
                    refreshToken: refresh_token,
                },
            });
            yield user.save();
            searchUser = user;
        }
        res.status(200).json({
            message: 'Login successful',
            token: (0, auth_1.generateToken)(searchUser._id.toString(), email),
            isAdmin: (0, adminCheck_1.checkAdmin)(searchUser.email),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.googleLogin = googleLogin;
const facebookLogin = (req, res, next) => {
    try {
    }
    catch (error) {
        next(error);
    }
};
exports.facebookLogin = facebookLogin;
//# sourceMappingURL=auth.js.map