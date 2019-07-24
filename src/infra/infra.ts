import {User} from "../models/user";

import {UserRepository} from "../models/userRepository";
import {Id} from "../models/id";

export class PostgresUserRepository implements UserRepository {
    private client: any;

    constructor(c: any) {
        this.client = c;
    }

    public find(email: string) {
        return this.client("users").select("id", "email", "password")
            .where("email", email)
            .first()
            .then((user: any) => new User(user.id, user.email, user.password))
            .catch((user: any) => undefined);
    }

    public create(user: User) {
        this.client("users").insert({ id: user.id, email: user.email, password: user.password });
    }
}
