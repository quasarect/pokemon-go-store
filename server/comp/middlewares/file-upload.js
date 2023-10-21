"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const IError_1 = require("../types/IError");
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const baseDir = path_1.default.resolve();
const allowedImageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
const allowedVideoMimeTypes = ['video/mp4', 'video/mpeg'];
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (allowedImageMimeTypes.includes(file.mimetype)) {
            cb(null, `${baseDir}/media/images`);
        }
        else if (allowedVideoMimeTypes.includes(file.mimetype)) {
            cb(null, `${baseDir}/media/videos`);
        }
        else {
            return cb(new Error('Only photos and videos are allowed'), '');
        }
    },
    filename: function (req, file, cb) {
        var _a;
        const ext = path_1.default.extname(file.originalname);
        const filename = `${(0, uuid_1.v4)()}-${(_a = req.user) === null || _a === void 0 ? void 0 : _a.id}${ext}`;
        if (!req.body.files) {
            req.body.files = {};
        }
        req.body.files = Object.assign(Object.assign({}, req.body.files), { [file.fieldname]: filename });
        cb(null, filename);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const fileUpload = (req, res, next) => {
    fs_1.default.mkdir('media', { recursive: true }, () => { });
    upload.any()(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            next(new IError_1.IError('Multer file Upload file error', 500));
        }
        else if (err) {
            next(err);
        }
        else {
            next();
        }
    });
};
exports.fileUpload = fileUpload;
//# sourceMappingURL=file-upload.js.map