import jwt from "jsonwebtoken";
import {UserRepository} from "../models/userRepository";
import {IPasswordService} from "./password/PasswordService";
import {IHttpErrors} from "./errors/HttpErrors";

interface IUserDTO {
    email: string;
    password: string;
}

export class UserService {
    private repo: UserRepository;
    private PasswordService: IPasswordService;
    private errors: IHttpErrors
    constructor(repo: UserRepository, PasswordService: IPasswordService, errors: IHttpErrors) {
        this.repo = repo;
        this.PasswordService = PasswordService;
        this.errors = errors;
    }

    public async login(data: IUserDTO): Promise<string> {
        try {
            const user = await this.repo.find(data.email);
            const match = this.PasswordService.comparePasswords(data.password, user.password);
            if (user && match) {
                return jwt.sign({user: user.id},
                    "secretkey123",
                    {
                        expiresIn: "24h"
                    }
                );
            } else {
                throw this.errors.conflict;
            }
        } catch (err) {
            throw err;
        }
    }
}
