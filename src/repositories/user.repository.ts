import {
    userSignupData,
    userDbReturnData,
    IUserUpdatePayload,
    userLoginReturnData,
    userPasswordConfirmation
} from '../interfaces/user.d';
import AppError from "../errors/AppError";
import User from "../models/User.model";
import userCreateErrorMapper from '../mappers/userCreateError.mapper';

export const confirmAuthorizationFind = async (cpf: string): Promise<userPasswordConfirmation> => {
    try {
        const userPwdHash: userPasswordConfirmation = await User.findOne({ cpf }, {
            _id: 1,
            password: 1
        });
        if (!userPwdHash) {
            throw new AppError({
                message: 'Usuário não encontrado',
                type: 'Usuario-Autalizar',
                status: 400
            });
        }
        return userPwdHash;
    } catch (err: any) { throw new AppError(err) }
}

export const findByCpf = async (cpf: string): Promise<userDbReturnData | null> => {
    try {
        const user: userDbReturnData = await User.findOne({ cpf });
        if (!user) {
            return null;
        }
        return user;
    } catch (err: any) { throw new AppError(err) }
}

export const findById = async (id: string): Promise<userLoginReturnData> => {
    try {
        const user: userLoginReturnData = await User.findById(id, {
            _id: 0,
            cpf: 1,
            role: 1,
            email: 1,
            lastName: 1,
            firstName: 1
        });
        if (!user) {
            throw new AppError({
                message: 'Usuário não encontrado',
                type: 'Usuario-Busca-ID',
                status: 400
            });
        }
        return user;
    } catch (err: any) {
        throw new AppError(err);
    }
}

export const save = async (body: userSignupData): Promise<false | undefined> => {
    try {
        const newUser = new User(body);
        await newUser.save();
        return false;
    } catch (err: any) {
        if (err.keyValue) {
            const errorKey = userCreateErrorMapper(err);
            throw new AppError({
                message: `${errorKey} já existe`,
                type: `Usuario-Criar-${errorKey}`,
                status: 400
            });
        }
    }
}

export const update = async (body: IUserUpdatePayload, id: string): Promise<any> => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
                useFindAndModify: false
            }
        );
        if (!updatedUser) {
            throw new AppError({
                message: 'Usuário não encontrado',
                type: 'Usuario-Atualizar-Dados',
                status: 400
            });
        }
        return updatedUser;
    } catch (err: any) {
        if (err.keyValue) {
            const errorKey = userCreateErrorMapper(err);
            throw new AppError({
                message: `${errorKey} já existe`,
                type: `Usuario-Atualizar-${errorKey}`,
                status: 400
            });
        }
        throw new AppError(err);
    }
}

export const resetPassword = async (id: string, password: string): Promise<undefined> => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { password },
            {
                new: true,
                useFindAndModify: false
            });
        if (!updatedUser) {
            throw new AppError({
                message: 'Não foi possível atualizar a senha do usuário',
                type: 'Usuario-Recuperar-Senha',
                status: 500
            });
        }
        return;
    } catch (err: any) { throw new AppError(err) }
}

export const getUserPrivilege = async (id: string) => {
    try {
        const user = await User.findById(id, {
            _id: 0,
            role: 1
        });
        if (user) {
            return user;
        }
        throw new AppError({
            message: 'Usuário não encontrado',
            type: 'Usuario-Privilegio',
            status: 400
        });
    } catch (err: any) { throw new AppError(err) }
}