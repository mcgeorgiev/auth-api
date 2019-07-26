const bcrypt = require("bcrypt");

export interface IPasswordService {
    comparePasswords(password: string, hash: string): boolean;
    hashPassword(password: string): string;
}

export const BCryptPasswordService = {
    comparePasswords: (password: string, hash: string) => bcrypt.compareSync(password, hash),
    hashPassword: (password) => bcrypt.hashSync(password, 10)
} as IPasswordService;
