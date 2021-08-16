export interface userLoginData {
    cpf: string;
    password: string;
}

export interface userSignupData {
    cpf: string;
    email: string;
    password: string;
    lastName: string;
    firstName: string;
}

export interface IUserUpdatePayload {
    email: string;
    lastName: string;
    firstName: string;
}

export interface userPasswordUpdateData {
    cpf: string;
    password: string;
    newPassword: string;
}

export interface userLoginReturnData {
    cpf: string;
    role: string;
    email: string;
    lastName: string;
    firstName: string;
}

export interface userDbReturnData extends userLoginReturnData {
    _id: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}

export interface userUpdateData {
    cpf: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface userUpdateBody extends userUpdateData {
    password: string
}

export interface newCredentials {
    userData: userLoginReturnData;
    newToken: string;
}

export interface userPasswordConfirmation {
    _id: string,
    password: string
}