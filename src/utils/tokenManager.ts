import jwt from 'jsonwebtoken';
import { encrypt, decrypt } from 'crypto-js/aes';
import { enc } from 'crypto-js';
import AppError from '../errors/AppError';

export const verify = (token: string): any => {
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		return verified;
	} catch (error) {
		throw new AppError({
			message: 'Token Inválido',
			type: 'Acesso-Token-Inválido',
			status: 401,
		});
	}
};

export const generate = (id: string): string => {
	const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn: process.env.TOKEN_EXPIRATION,
	});
	return token;
};

export const addLayer = (token: string): string => encrypt(
	token,
	process.env.LAYER_SECRET,)
	.toString();

export const removeLayer = (layered: string): string => decrypt(
	layered,
	process.env.LAYER_SECRET)
	.toString(enc.Utf8);