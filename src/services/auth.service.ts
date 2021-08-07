import { postUpdateMapper, userUpdatePayloadMapper } from './../mappers/userUpdate.mapper';
import jwt from 'jsonwebtoken';
import { cpf } from 'cpf-cnpj-validator';

import AppError from '../errors/AppError';
import { encrypt, verify } from '../utils/passwordManager';
import {
    save,
    update,
    findById,
    findByCpf,
    confirmAuthorizationFind
} from '../repositories/user.repository';
import {
    userUpdateBody,
    userSignupData,
    userDbReturnData,
    userLoginReturnData,
    userLoginData
} from './../interfaces/user.d';

export const verifyExistingUser = async (cpf: string, email: string) => {
    const user: userDbReturnData = await findByCpf(cpf);
    if (user) {
        if (user.cpf === cpf && user.email === email) {
            throw new AppError(
                'Usuário já cadastrado',
                'Registro-Usuario-Cadastrado',
                400
            );
        } else if (user.cpf === cpf && user.email !== email) {
            throw new AppError(
                'CPF já cadstrado',
                'Registro-CPF-Cadastrado',
                400
            )
        } else {
            return false;
        }
    }
}

export const provideLoggedUserInfo = async (id: string) => {
    try {
        const user: userLoginReturnData = await findById(id);
        return user;
    } catch (err) {
        throw new AppError(err.message, err.type, err.status);
    }
}

export const register = async (body: userSignupData) => {
    try {
        const cpfValidation = cpf.isValid(body.cpf);
        if (!cpfValidation) {
            throw new AppError(
                'CPF inválido',
                'Registro-CPF-Invalido',
                400
            );
        }
        const existingUserValidation = await verifyExistingUser(
            body.cpf,
            body.email
        );
        if (!existingUserValidation) {
            const newUser: userSignupData = {
                ...body,
                password: await encrypt(body.password)
            };
            const errors = await save(newUser);
            if (errors) {
                console.log(errors);
                throw new AppError(
                    JSON.stringify(errors),
                    'Registro-AlgumBagulho-Existe',
                    400
                );
            }
        }
    } catch (err) {
        throw new AppError(
            err.message,
            err.type,
            err.status
        );
    }
}

export const updateUserInfo = async (body: userUpdateBody) => {
    try {
        const user = await confirmAuthorizationFind(body.email);
        const authorization = await verify(body.password, user.password);
        let updatedUser = await update(
            userUpdatePayloadMapper(body),
            user._id
        );
        updatedUser = postUpdateMapper(updatedUser);
        return updatedUser;
    } catch (err) {
        throw new AppError(err.message, err.type, err.status);
    }
}

export const authenticateUser = async (credentials: userLoginData) => {
    try {
        const user = await findByCpf(credentials.cpf);
        if (!user) {
            throw new AppError(
                'CPF ou senha incorretos',
                'Acesso-Credencial-Invalida',
                401
            );
        }
        const passwordVerification = verify(credentials.password, user.password);
        if (!passwordVerification) {
            throw new AppError(
                'CPF ou senha incorretos',
                'Acesso-Credencial-Invalida',
                401
            );
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRATION }
        );

        return token;
    } catch (error) {
        
    }
}