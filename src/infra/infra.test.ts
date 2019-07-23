import knex from "knex";
import {PostgresUserRepository} from "./infra";
import {Id} from "../models/id";
import {User} from "../models/user";

const dbConnection = knex({
    client: "pg",
    connection: "postgres://postgres:postgres@localhost:5432/my_db"
});

let userRepo: PostgresUserRepository;

beforeAll(() => {
    userRepo = new PostgresUserRepository(dbConnection);
});

afterAll(() => {
    dbConnection.destroy();
});

describe("User", () => {
    test("should be found", async (done) => {
        const user = await userRepo.find("test@test.com");
        done();
        expect(user.id).toBeDefined();
        expect(user.email).toEqual("test@test.com");
        expect(user.password).toEqual("password");
    });

    test("should be created", async (done) => {
        const user = new User(new Id(), "test2@test2.com", "secret-password")
        await userRepo.create(user);
        done();

        const createdUser = await userRepo.find("test2@test2.com");
        done();
        expect(createdUser.id).toBeDefined();
        expect(createdUser.email).toEqual("test2@test2.com");
        expect(createdUser.password).toBeDefined();
    });

    test("should be", () => {
        const user = userRepo.find("test@test.com");
        expect(user.id).toBeDefined();
        expect(user.email).toEqual("test@test.com");
        expect(user.password).toEqual("password");
    });
});
