import {
    userUpdateBody,
    userDbReturnData,
    IUserUpdatePayload,
    userLoginReturnData
} from './../interfaces/user.d';

export const userUpdatePayloadMapper = (body: userUpdateBody): IUserUpdatePayload => {
    const updatePayload: IUserUpdatePayload = {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName
    };
    return updatePayload;
}

export const postUpdateMapper = (user: userDbReturnData): userLoginReturnData => {
    const mapped: userLoginReturnData =  {
        cpf: user.cpf,
        role: user.role,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName
    };
    return mapped;
}