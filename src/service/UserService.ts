import * as jwt from "jsonwebtoken";
import {User} from "../models/user";
import {UserRepository} from "../models/userRepository";
import {IHttpErrors} from "./errors/HttpErrors";
import {IPasswordService} from "./password/PasswordService";

interface IUserDTO {
    email: string;
    password: string;
}

export class UserService {
    private repo: UserRepository;
    private PasswordService: IPasswordService;
    private errors: IHttpErrors;
    private newId: () => string;
    constructor(repo: UserRepository, PasswordService: IPasswordService, errors: IHttpErrors, newId: () => string) {
        this.repo = repo;
        this.PasswordService = PasswordService;
        this.errors = errors;
        this.newId = newId;
    }

    public async login(data: IUserDTO): Promise<string> {
        const user = await this.repo.find(data.email);
        if (user) {
            const match = this.PasswordService.comparePasswords(data.password, user.password);
            if (match) {
                return this.createJWT(user.id);
            }
        }
        throw this.errors.unauthorized;
    }

    public async create(data: IUserDTO): Promise<string> {
        const user = await this.repo.create(
            new User(this.newId(), data.email, this.PasswordService.hashPassword(data.password)));
        if (user) {
            return this.createJWT(user.id);
        }
        throw this.errors.conflict;
    }

    private createJWT(id: string) {
        return jwt.sign({user: id},
            "secretkey123",
            {
                expiresIn: "24h"
            }
        );
    }
}
