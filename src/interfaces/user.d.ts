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
    createdAt: date,
    updatedAt: Date
}

export interface userUpdateData {
    email: string;
    firstName: string;
    lastName: string;
}

export interface userUpdateBody extends userUpdateData {
    password: string
}