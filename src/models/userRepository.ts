import {User} from "./user";

export interface UserRepository {
    find(email: string): Promise<User>;
    create(user: User): void;
}
