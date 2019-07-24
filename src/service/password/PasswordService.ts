const bcrypt = require("bcrypt");

export interface IPasswordService {
    comparePasswords(password: string, hash: string): boolean;
}

export const BCryptPasswordService = {
    comparePasswords: (password: string, hash: string) => bcrypt.compareSync(password, hash)
} as IPasswordService;
