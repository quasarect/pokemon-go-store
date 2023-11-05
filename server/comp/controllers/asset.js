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
exports.getBoughtAssetById = exports.getBoughtAssets = exports.getGlobalSearch = exports.soldAssets = exports.queryAssets = exports.getAssetsByType = exports.getAssetById = exports.deleteAsset = exports.updateAssest = exports.createAsset = void 0;
const IError_1 = require("../types/IError");
const asset_1 = __importDefault(require("../models/asset"));
const asset_2 = require("../types/models/asset");
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const createAsset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { files, assetType, price, info } = req.body;
        if (!assetType && !price) {
            throw new IError_1.IError('Price and type is required', 400);
        }
        const asset = new asset_1.default({
            media: files,
            assetType,
            price,
            info: JSON.parse(info),
        });
        yield asset.save();
        res.status(200).json({ message: 'Asset created' });
    }
    catch (error) {
        next(error);
    }
});
exports.createAsset = createAsset;
const updateAssest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { files, price, info, assetId } = req.body;
        if (!files && !price && !info) {
            throw new IError_1.IError('Nothing to update', 400);
        }
        yield asset_1.default.findByIdAndUpdate(assetId, {
            $set: { media: files, price, info },
        });
        res.status(200).json({ message: `${assetId} updated successfully ` });
    }
    catch (error) {
        next(error);
    }
});
exports.updateAssest = updateAssest;
const deleteAsset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { assetId } = req.body;
        yield asset_1.default.findByIdAndDelete(assetId);
        res.status(200).json({ message: `${assetId} deleted successfully` });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAsset = deleteAsset;
const getAssetById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { assetId } = req.params;
        const asset = yield asset_1.default.findById(assetId);
        res.status(200).json(asset);
    }
    catch (error) {
        next(error);
    }
});
exports.getAssetById = getAssetById;
const getAssetsByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { assetType } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!Object.values(asset_2.AssetTypes).includes(assetType)) {
            throw new IError_1.IError('AssetTyoe not valid', 400);
        }
        const assets = yield asset_1.default.find({ assetType, available: true });
        let newAssets = [];
        if (userId) {
            const userFavourites = yield user_1.default
                .findById(userId)
                .populate('favourites');
            if (userFavourites === null || userFavourites === void 0 ? void 0 : userFavourites.favourites) {
                assets.forEach((asset) => {
                    const isFav = userFavourites.favourites.some((favorite) => favorite._id.equals(asset._id.toString()));
                    newAssets.push(Object.assign(Object.assign({}, asset._doc), { isFav }));
                });
            }
        }
        const respAssets = newAssets.length > 0 ? newAssets : assets;
        res.status(200).json({ assets: respAssets });
    }
    catch (error) {
        next(error);
    }
});
exports.getAssetsByType = getAssetsByType;
const queryAssets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { assetType, query, price, priceOperator } = req.body;
        if (!Object.values(asset_2.AssetTypes).includes(assetType)) {
            throw new IError_1.IError('AssetType not valid', 400);
        }
        const queryObject = { available: true };
        if (assetType) {
            queryObject.assetType = assetType;
        }
        if (query) {
            queryObject.info = query;
        }
        if (price && priceOperator) {
            switch (priceOperator) {
                case 'greaterThan':
                    queryObject.price = { $gt: price };
                    break;
                case 'lessThan':
                    queryObject.price = { $lt: price };
                    break;
                default:
                    break;
            }
        }
        const assets = yield asset_1.default.find(queryObject);
        res.status(200).json(assets);
    }
    catch (error) {
        next(error);
    }
});
exports.queryAssets = queryAssets;
const soldAssets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { assetType } = req.params;
        const assets = yield asset_1.default.find({ soldTo: { $ne: null }, assetType });
        if (!assets || assets.length === 0) {
            return res.status(404).json({ message: 'No sold assets found.' });
        }
        res.status(200).json(assets);
    }
    catch (error) {
        next(error);
    }
});
exports.soldAssets = soldAssets;
const getGlobalSearch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { assetType, text } = req.params;
        if (!Object.values(asset_2.AssetTypes).includes(assetType)) {
            throw new IError_1.IError('AssetTyoe not valid', 400);
        }
        yield asset_1.default.find({
            assetType,
            $text: { $search: text },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getGlobalSearch = getGlobalSearch;
const getBoughtAssets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const user = yield user_1.default.findById(userId).populate('assets');
        const accounts = user === null || user === void 0 ? void 0 : user.assets.filter((asset) => {
            return asset.assetType === asset_2.AssetTypes.pogo_account;
        });
        const pgsharps = user === null || user === void 0 ? void 0 : user.assets.filter((asset) => {
            return asset.assetType === asset_2.AssetTypes.pg_sharp;
        });
        while (((accounts === null || accounts === void 0 ? void 0 : accounts.length) || 0) + ((pgsharps === null || pgsharps === void 0 ? void 0 : pgsharps.length) || 0) <
            ((user === null || user === void 0 ? void 0 : user.assets.length) || 0)) {
        }
        res.status(200).json({ accounts, pgsharps });
    }
    catch (error) {
        next(error);
    }
});
exports.getBoughtAssets = getBoughtAssets;
const getBoughtAssetById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        const assetId = req.params.assetId;
        const userAssets = yield user_1.default.findOne({
            _id: userId,
            assets: new mongoose_1.default.Types.ObjectId(assetId),
        });
        if (userAssets) {
            const asset = yield asset_1.default.findById(assetId);
            res.status(200).json(asset);
        }
        else {
            throw new IError_1.IError('Asset not bought', 404);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getBoughtAssetById = getBoughtAssetById;
//# sourceMappingURL=asset.js.map