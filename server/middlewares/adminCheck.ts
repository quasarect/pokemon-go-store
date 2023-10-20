import { Admins } from '../types/Admins';
import { IError } from '../types/IError';

export const checkAdmin = async (email: string) => {
	try {
		if (Object.values(Admins).includes(email as Admins)) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		throw new IError('Unknown Error in Admin Check', 500);
	}
};

