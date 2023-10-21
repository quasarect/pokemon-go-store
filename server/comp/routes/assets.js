"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const asset_1 = require("../controllers/asset");
const file_upload_1 = require("../middlewares/file-upload");
const favourite_1 = __importDefault(require("./favourite"));
const assetRouter = (0, express_1.Router)();
assetRouter.post('/create', file_upload_1.fileUpload, asset_1.createAsset);
assetRouter.delete('/', auth_1.isAuth, auth_1.isAdmin, asset_1.deleteAsset);
assetRouter.patch('/', auth_1.isAuth, auth_1.isAdmin, file_upload_1.fileUpload, asset_1.updateAssest);
assetRouter.get('/sold/:assetType', auth_1.isAuth, auth_1.isAdmin, asset_1.soldAssets);
assetRouter.get('/:assetId/id', auth_1.getUserDetails, asset_1.getAssetById);
assetRouter.get('/:assetType/all', auth_1.getUserDetails, asset_1.getAssetsByType);
assetRouter.post('/query', auth_1.getUserDetails, asset_1.queryAssets);
assetRouter.use('/favourite', favourite_1.default);
exports.default = assetRouter;
//# sourceMappingURL=assets.js.map