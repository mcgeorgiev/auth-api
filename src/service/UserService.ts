import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserRepository} from "../models/userRepository";
// class AccountService(val accountRepository: AccountRepository) {
//     val accountValidator = AccountValidator(accountRepository)
//
//     fun createAccount(accountDto: AccountDto) : Account {
//         val account = Account.create(generateUUIDString(),
//             accountDto.email)
//
//         when(accountValidator.emailExists(account)) {
//             true -> throw EmailExistsException("This email already exists.")
//             false -> {
//                 accountRepository.create(account)
//             }
//         }
//         return account
//     }
// }

interface IUserDTO {
    email: string;
    password: string;
}

export interface IPasswordService {
    comparePasswords(password: string, hash: string): boolean;
}

abstract class BCryptPasswordService implements IPasswordService {
    public comparePasswords(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
    }
}

export class UserService {
    private repo: UserRepository;
    private PasswordService: IPasswordService;
    constructor(repo: UserRepository, PasswordService: IPasswordService) {
        this.repo = repo;
        this.PasswordService = PasswordService;
    }

    public login(data: IUserDTO): string | undefined {
        const user = this.repo.find(data.email)
        const match = this.PasswordService.comparePasswords(data.password, user.password);
        if (user && match) {
              return jwt.sign({ user: user.id },
              "secretkey123",
              { expiresIn: "24h"
              }
            );
        } else {
            console.log("here")
            throw new Error("Unsuccessful.");
        }
        return undefined;
    }
}