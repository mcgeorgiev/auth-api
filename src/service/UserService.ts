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
    constructor(repo: UserRepository, PasswordService: IPasswordService, errors: IHttpErrors) {
        this.repo = repo;
        this.PasswordService = PasswordService;
        this.errors = errors;
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
        throw this.errors.conflict;
    }

    public async create(data: IUserDTO): Promise<string> {
        const user = await this.repo.create(new User("id", data.email, data.password))
        return jwt.sign({user: 123},
            "secretkey123",
            {
                expiresIn: "24h"
            }
        );
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