import bcrypt from 'bcrypt';

export const encrypt = (plainTextPassword: string) => bcrypt.hashSync(plainTextPassword, 10);

export const verify = (plainTextPassword: string, hash: string) => bcrypt.compareSync(plainTextPassword, hash);