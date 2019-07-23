import bcrypt from "bcrypt";

export interface IPasswordService {
    comparePasswords(password: string, hash: string): boolean;
}

// export abstract class BCryptPasswordService implements IPasswordService {
//     public comparePasswords(password: string, hash: string) {
//         return bcrypt.compareSync(password, hash);
//     }
// }

export const BCryptPasswordService = {
    comparePasswords: (password: string, hash: string) => bcrypt.compareSync(password, hash)
} as IPasswordService;
