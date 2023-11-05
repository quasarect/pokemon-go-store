"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const user_1 = require("../types/models/user");
const oauthCredentials = new mongoose_1.Schema({
    accessToken: { type: String },
    refreshToken: { type: String },
}, { _id: false });
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
    },
    authType: {
        type: String,
        enum: user_1.AuthTypes,
    },
    profilePhoto: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png?20221210150350',
    },
    oauthCredentials: oauthCredentials,
    credits: {
        type: Number,
        default: 0,
    },
    favourites: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'asset',
        },
    ],
    assets: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'asset',
        },
    ],
}, { timestamps: true });
const userModel = (0, mongoose_1.model)('user', userSchema);
exports.default = userModel;
//# sourceMappingURL=user.js.map