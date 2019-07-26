import {User} from "./user";

export interface UserRepository {
    find(email: string): User | undefined;
    create(user: User): User | undefined;
}
