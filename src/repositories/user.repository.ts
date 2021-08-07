import { userUpdateData } from './../interfaces/user.d';
import { userSignupData, userDbReturnData, userLoginData, userLoginReturnData } from '../interfaces/user';
import AppError from "../errors/AppError";
import { User } from "../models/User.model";
import { postUpdateMapper } from '../mappers/userUpdate.mapper';

export const confirmAuthorizationFind = async (email: string) => {
    try {
        const userPwdHash = await User.findOne({ email }, {
            _id: 1,
            password: 1
        });
        return userPwdHash;
    } catch (err) {
        throw new AppError(
            err.message,
            'Usuario-Busca-Email',
            400
        );
    }
}

export const findByCpf = async (cpf: string) => {
    try {
        const user: userDbReturnData = await User.findOne({ cpf });
        return user;
    } catch (err) {
        throw new AppError(
            err.message,
            'Usuario-Busca-Cpf',
            undefined,
        );
    }
}

export const findById = async (id: string) => {
    try {
        const user: userLoginReturnData = await User.findById(id, {
            _id: 0,
            cpf: 1,
            role: 1,
            email: 1,
            lastName: 1,
            firstName: 1
        });
        return user;
        
    } catch (err) {
        throw new AppError(
        err.message,
        'Usuario-Busca-Id',
        undefined,
        Error.captureStackTrace(err)
        );
    }
}

export const save = async (body: userSignupData) => {
    try {
        const newUser = new User(body);
        await newUser.save();
        return false;
    } catch (err) {
        // PRECISA TESTAR TODO ESSE FLUXO!!!
        if (
            Object.keys(err.keyPattern)
            && (Object.keys(err.keyPattern['email'])
            || Object.keys(err.keyPattern['cpf']))
        ) {
            return Object.keys(err.keyValue);
        } else {
            console.log(err);
            throw new AppError(
                err.message,
                undefined,
                undefined,
                Error.captureStackTrace(err)
            );
        }
    }
}

export const update = async (body: userUpdateData, id: string) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
                useFindAndModify: false
            }
        );
        return updatedUser;
    } catch (err) {
        throw new AppError(err.message, 'Atualizar-Usuario', undefined)
    }
}