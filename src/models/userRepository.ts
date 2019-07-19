import {User} from "./user";

export interface UserRepository {
    find(email: string): any;
    create(email: string, password: string): any;
}
