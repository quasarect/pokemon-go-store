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
exports.getFavourites = exports.removeFromFavourite = exports.addToFavourite = void 0;
const user_1 = __importDefault(require("../models/user"));
const IError_1 = require("../types/IError");
const asset_1 = require("../types/models/asset");
const asset_2 = __importDefault(require("../models/asset"));
const addToFavourite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { assetId } = req.query;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const asset = yield asset_2.default.findById(assetId);
        if (!asset) {
            throw new IError_1.IError('Asset Not found', 404);
        }
        yield user_1.default.findByIdAndUpdate(userId, {
            $push: { favourites: assetId },
        });
        res.status(200).json({ message: 'Added successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.addToFavourite = addToFavourite;
const removeFromFavourite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { assetId } = req.query;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const asset = yield asset_2.default.findById(assetId);
        if (!asset) {
            throw new IError_1.IError('Asset Not found', 404);
        }
        yield user_1.default.findByIdAndUpdate(userId, {
            $pull: { favourites: assetId },
        });
        res.status(200).json({ message: 'Removed successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.removeFromFavourite = removeFromFavourite;
const getFavourites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        const favourites = yield user_1.default.findById(userId).populate('favourites');
        const accountFavourites = favourites === null || favourites === void 0 ? void 0 : favourites.favourites.filter((favourite) => {
            return favourite.assetType === asset_1.AssetTypes.pogo_account;
        });
        const pgsharpFavourites = favourites === null || favourites === void 0 ? void 0 : favourites.favourites.filter((favourite) => {
            return favourite.assetType === asset_1.AssetTypes.pg_sharp;
        });
        console.log(((accountFavourites === null || accountFavourites === void 0 ? void 0 : accountFavourites.length) || 0) + ((pgsharpFavourites === null || pgsharpFavourites === void 0 ? void 0 : pgsharpFavourites.length) || 0)),
            console.log((favourites === null || favourites === void 0 ? void 0 : favourites.favourites.length) || 0);
        while (((accountFavourites === null || accountFavourites === void 0 ? void 0 : accountFavourites.length) || 0) + ((pgsharpFavourites === null || pgsharpFavourites === void 0 ? void 0 : pgsharpFavourites.length) || 0) <
            ((favourites === null || favourites === void 0 ? void 0 : favourites.favourites.length) || 0)) {
        }
        res
            .status(200)
            .json({ accounts: accountFavourites, pgsharp: pgsharpFavourites });
    }
    catch (error) {
        next(error);
    }
});
exports.getFavourites = getFavourites;
//# sourceMappingURL=favourites.js.map