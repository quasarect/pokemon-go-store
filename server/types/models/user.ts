import { ObjectId } from 'mongoose';

export interface IUser {
	name: string;
	email: string;
	authType: AuthTypes;
	password?: string;
	credits: number;
	profilePhoto: string;
	oauthCredentials?: OauthCredentials;
	favourites: Array<ObjectId>;
	assets: Array<ObjectId>;
}

export enum AuthTypes {
	facebook = 'facebook',
	google = 'google',
	password = 'password',
}

export interface OauthCredentials {
	accessToken: string;
	refreshToken: string;
}
