import { userUpdateBody, userUpdateData, userDbReturnData, userLoginReturnData } from './../interfaces/user.d';

export const userUpdatePayloadMapper = (body: userUpdateBody): userUpdateData => {
    const updatePayload: userUpdateData = {
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