import {User} from "./models/user";

import {UserRepository} from "./models/userRepository";

export class PostgresUserRepository implements UserRepository {
    private client: any;

    constructor(c: any) {
        this.client = c;
    }
    public async find(email: string) {
        const user = await this.client("users").select("id", "email", "password")
            .where("email", email)
            .first();
        return new User(user.id, user.email, user.password);
    }

    public async create(user: User) {
        await this.client("users").insert({ id: user.id, email: user.email, password: user.password });
    }
}
