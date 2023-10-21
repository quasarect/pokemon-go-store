import { RequestHandler } from 'express';
import { IError } from '../types/IError';
import { google } from 'googleapis';
import axios from 'axios';
import userModel from '../models/user';
import bcrypt from 'bcrypt';
import { generateToken } from '../middlewares/auth';
import { AuthTypes } from '../types/models/user';
import { checkAdmin } from '../middlewares/adminCheck';

export const login: RequestHandler = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await userModel.findOne({ email });
		if (!user) {
			throw new IError('User not found', 404);
		}
		if (!user.password) {
			throw new IError('Different auth type', 400);
		}
		if (!(await bcrypt.compare(password, user.password))) {
			throw new IError('Wrong password', 400);
		}
		res.status(200).json({
			message: 'Login successful',
			token: generateToken(user._id.toString(), user.email),
			isAdmin: await checkAdmin(user.email),
		});
	} catch (error) {
		next(error);
	}
};

export const signup: RequestHandler = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		const user = new userModel({
			name,
			email,
			password: bcrypt.hashSync(password, 10),
			authType: AuthTypes.password,
		});
		await user.save();
		res.status(200).json({
			message: 'Signup successful',
			token: generateToken(user._id.toString(), email),
			isAdmin: await checkAdmin(user.email),
		});
	} catch (error: any) {
		if (error.code === 11000) {
			next(new IError('Email already exists', 400));
		}
		next(error);
	}
};

export const googleLogin: RequestHandler = async (req, res, next) => {
	try {
		const oauth2Client = new google.auth.OAuth2(
			process.env.GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			process.env.GOOGLE_REDIRECT_URL,
		);
		const { code } = req.body;
		if (!code) {
			throw new IError('Code not found', 404);
		}
		const { tokens } = await oauth2Client.getToken(code as string);
		const { access_token, refresh_token } = tokens;
		const userInfo = await axios.get(
			'https://people.googleapis.com/v1/people/me?personFields=emailAddresses,photos,names',
			{ headers: { Authorization: `Bearer ${access_token}` } },
		);
		const name = userInfo.data.names.find(
			(name: any) => name.metadata.primary === true,
		)?.displayName;
		const profilePhoto = userInfo.data.photos.find(
			(photo: any) => photo.metadata.primary === true,
		)?.url;
		const email = userInfo.data.emailAddresses.find(
			(email: any) => email.metadata.primary === true,
		)?.value;
		let searchUser = await userModel.findOne({ email });
		if (!searchUser) {
			const user = new userModel({
				name,
				email,
				profilePhoto,
				authType: AuthTypes.google,
				oauthCredentials: {
					accessToken: access_token,
					refreshToken: refresh_token,
				},
			});
			await user.save();
			searchUser = user;
		}
		res.status(200).json({
			message: 'Login successful',
			token: generateToken(searchUser._id.toString(), email),
			isAdmin: checkAdmin(searchUser.email),
		});
	} catch (error) {
		next(error);
	}
};

export const facebookLogin: RequestHandler = (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};
