import {User} from "../models/user";

import {UserRepository} from "../models/userRepository";
import {Id} from "../models/id";

export class PostgresUserRepository implements UserRepository {
    private client: any;

    constructor(c: any) {
        this.client = c;
    }

    private f(email: string): Promise<User> {
        return this.client("users").select("id", "email", "password")
            .where("email", email)
            .first()
            .then((user: any) => new User(user.id, user.email, user.password));
    }

    public find(email: string) {
        return this.f(email).then((user) => user);
        // return this.client("users").select("id", "email", "password")
        //     .where("email", email)
        //     .first()
        //     .then((user: any) => new User(user.id, user.email, user.password));
    }

    public create(user: User) {
        this.client("users").insert({ id: user.id, email: user.email, password: user.password });
    }
}
