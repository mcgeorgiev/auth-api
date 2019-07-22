import bcrypt from "bcrypt";

export interface IPasswordService {
    comparePasswords(password: string, hash: string): boolean;
}

abstract class BCryptPasswordService implements IPasswordService {
    public comparePasswords(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
    }
}