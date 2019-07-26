import * as jwt from "jsonwebtoken";
import {UserRepository} from "../models/userRepository";
import {IPasswordService} from "./password/PasswordService";
import {IHttpErrors} from "./errors/HttpErrors";
import {User} from "../models/user";

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
                return jwt.sign({user: user.id},
                    "secretkey123",
                    {
                        expiresIn: "24h"
                    }
                );
            }
        }
        throw this.errors.unauthorized;
    }

    public async create(data: IUserDTO): Promise<string> {
        const user = await this.repo.create(
            new User(this.newId(), data.email, this.PasswordService.hashPassword(data.password)));
        if (user) {
            return jwt.sign({user: user.id},
                "secretkey123",
                {
                    expiresIn: "24h"
                }
            );
        }
        throw this.errors.conflict;
    }
}

// const hashPassword = (password) => bcrypt.hashSync(password, 10);
//
// app.post("/signup", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//
//   if (email === undefined || password === undefined) { res.sendStatus(400); }
//
//   try {
//     const user = await knex("users")
//       .select("email")
//       .where("email", email)
//       .first();
//     if (!user) {
//       await knex("users").insert({ id: generateId(), email, password: hashPassword(password) });
//       res.sendStatus(201);
//     } else {
//       res.sendStatus(409);
//     }
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });
