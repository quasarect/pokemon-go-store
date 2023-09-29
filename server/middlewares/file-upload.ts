import { RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';
import { IError } from '../types/IError';
import fs from 'fs';
import { IRequest } from '../types/IRequest';
import { v4 } from 'uuid';

const baseDir = path.resolve();

const allowedImageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
const allowedVideoMimeTypes = ['video/mp4', 'video/mpeg'];

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		if (allowedImageMimeTypes.includes(file.mimetype)) {
			// For photos, set the destination directory for images
			cb(null, `${baseDir}/media/images`);
		} else if (allowedVideoMimeTypes.includes(file.mimetype)) {
			// For videos, set the destination directory for videos
			cb(null, `${baseDir}/media/videos`);
		} else {
			// Disallow other file types
			return cb(new Error('Only photos and videos are allowed'), '');
		}
	},
	filename: function (req: IRequest, file, cb) {
		const ext = path.extname(file.originalname);
		const filename = `${v4()}-${req.user?.id}${ext}`;
		if (!req.body.files) {
			req.body.files = [];
		}
		req.body.files.push(filename);
		cb(null, filename);
	},
});

const upload = multer({ storage: storage });

export const fileUpload: RequestHandler = (req, res, next) => {
	fs.mkdir('media', { recursive: true }, () => {});
	upload.any()(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			next(new IError('Multer file Upload file error', 500));
		} else if (err) {
			next(err);
		} else {
			next();
		}
	});
};
