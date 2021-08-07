import bcrypt from 'bcrypt';

export const encrypt = async (plainTextPassword: string) => {
    const encrypted: string = await bcrypt.hash(plainTextPassword, 10);
    return encrypted;
};

export const verify = async (plainTextPassword: string, hash: string) => {
    const validation = await bcrypt.compare(plainTextPassword, hash);
    return validation;
};