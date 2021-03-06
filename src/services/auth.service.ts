import {
	postUpdateMapper,
	userUpdatePayloadMapper,
} from './../mappers/userUpdate.mapper';
import { cpf } from 'cpf-cnpj-validator';
import { generate } from '../utils/tokenManager';
import AppError from '../errors/AppError';
import { encrypt, verify } from '../utils/passwordManager';
import {
	save,
	update,
	findById,
	findByCpf,
	resetPassword,
	getUserPrivilege,
	confirmAuthorizationFind,
} from '../repositories/user.repository';
import {
	userLoginData,
	newCredentials,
	userSignupData,
	userLoginReturnData,
	userPasswordUpdateData,
} from './../interfaces/user.d';
import privilegesEnum from '../constants/privileges.enum';
import { IPrivilegesEnum } from '../interfaces/enum';

export const provideLoggedUserInfo = async (
	id: string
): Promise<userLoginReturnData> => {
	try {
		const user: userLoginReturnData = await findById(id);
		return user;
	} catch (err: any) { throw new AppError(err) }
};

export const register = async (body: userSignupData): Promise<void> => {
	try {
		const cpfValidation = cpf.isValid(body.cpf);
		if (!cpfValidation) {
			throw new AppError({
				message: "CPF inválido",
				type: "Registro-CPF-Invalido",
				status: 400,
			});
		}
		const newUser: userSignupData = {
			...body,
			password: await encrypt(body.password),
		};
		await save(newUser);
		return;
	} catch (err: any) { throw new AppError(err) }
};

export const updateUserInfo = async (body: any): Promise<newCredentials> => {
	try {
		const user = await confirmAuthorizationFind(body.cpf);
		const authorization = await verify(body.password, user.password);
		switch (authorization) {
			case true:
				let userData = await update(userUpdatePayloadMapper(body), user._id);
				userData = postUpdateMapper(userData);
				const newToken = generate(user._id);
				return { userData, newToken };
			case false:
				throw new AppError({
					message: "Senha incorreta",
					type: "Usuario-Atualizar-Senha",
					status: 400,
				});
		}
	} catch (err: any) { throw new AppError(err) }
};

export const updateUserPassword = async (body: userPasswordUpdateData) => {
	try {
		const user = await confirmAuthorizationFind(body.cpf);
		const authorization = await verify(body.password, user.password);
		switch (authorization) {
			case true:
				await resetPassword(user._id, await encrypt(body.newPassword));
				break;
			case false:
				throw new AppError({
					message: "Senha incorreta",
					type: "Usuario-Recuperar-Senha",
					status: 400,
				});
		}
	} catch (err: any) { throw new AppError(err) }
};

export const authenticateUser = async (
	credentials: userLoginData
): Promise<newCredentials> => {
	try {
		const user: any = await findByCpf(credentials.cpf);
		const found = !!user;
		switch (found) {
			case true:
				const passwordVerification = await verify(
					credentials.password,
					user.password
				);
				if (!passwordVerification) {
					throw new AppError({
						message: "CPF ou senha incorretos",
						type: "Acesso-Credencial-Invalida",
						status: 401,
					});
				}
				return {
					newToken: generate(user._id),
					userData: {
						cpf: user.cpf,
						role: user.role,
						email: user.email,
						lastName: user.lastName,
						firstName: user.firstName,
					},
				};
			default:
				throw new AppError({
					message: "Usuário não encontrado",
					type: "Acesso-Usuario-404",
					status: 404,
				});
		}
	} catch (err: any) {
		throw new AppError(err);
	}
};

export const provideNewSessionInfo = async (
	id: string
): Promise<newCredentials> => {
	try {
		const userData = await provideLoggedUserInfo(id);
		const newToken = generate(id);
		return { userData, newToken };
	} catch (error) {
		throw new AppError({
			message: "Credenciais inválidas, por favor realize login novamente",
			type: "Sessao-Credenciais-Invalidas",
			status: 401,
		});
	}
};

// Needs testing!
export const checkUserPrivileges = async (
	id: string,
	...required: IPrivilegesEnum[]
): Promise<boolean> => {

	try {
		const { role } = await getUserPrivilege(id);
		if (required.includes(role)) {
			return true;
		}
		return false;
	} catch (err: any) { throw new AppError(err) }
}