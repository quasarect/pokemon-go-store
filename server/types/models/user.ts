export interface IUser {
	name: string;
	email: string;
	authType: AuthTypes;
	password?: string;
	credits: number;
	profilePhoto: string;
	oauthCredentials?: OauthCredentials;
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
