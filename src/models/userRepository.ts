import {User} from "./user";

export interface UserRepository {
    find(email: string): User;
    create(user: User): void;
}
