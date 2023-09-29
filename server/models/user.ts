import { Schema, model } from 'mongoose';
import { AuthTypes, IUser, OauthCredentials } from '../types/models/user';

const oauthCredentials = new Schema<OauthCredentials>(
	{
		accessToken: { type: String },
		refreshToken: { type: String },
	},
	{ _id: false },
);

const userSchema = new Schema<IUser>(
	{
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
			enum: AuthTypes,
		},
		profilePhoto: {
			type: String,
			default: '',
		},
		oauthCredentials: oauthCredentials,
		credits: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

const userModel = model<IUser>('user', userSchema);

export default userModel;
