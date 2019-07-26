import knex from "knex";
import {newId} from "../models/id";
import {User} from "../models/user";
import {PostgresUserRepository} from "./infra";
import {createTestUser} from "../testHelpers";

let userRepo: PostgresUserRepository;
let dbConnection: any;

beforeEach(() => {
    dbConnection = knex({
        client: "pg",
        connection: "postgres://postgres:postgres@localhost:5432/my_db"
    });
    userRepo = new PostgresUserRepository(dbConnection);
});

afterEach(async (done) => {
    await userRepo.truncate();
    done();
    dbConnection.destroy();
});

describe("User", () => {
    test("should be found", async (done) => {
        await createTestUser(dbConnection);
        done();

        const user = await userRepo.find("existing@user.com");
        done();
        expect(user.id).toEqual("1");
        expect(user.email).toEqual("existing@user.com");
        expect(user.password).toEqual("password");
    });

    test("should be not be found", async (done) => {
        const user = await userRepo.find("no@user.com");
        done();
        expect(user).not.toBeDefined();
    });

    test("should be created", async (done) => {
        const id = newId();
        const user = new User(id, "new@user.com", "secret-password");
        await userRepo.create(user);
        done();

        const newUser = await userRepo.find("new@user.com");
        done();
        expect(newUser.id).toEqual(id);
        expect(newUser.email).toEqual("new@user.com");
        expect(newUser.password).toEqual("secret-password");
    });
    test("should return user when created", async (done) => {
        const id = newId();
        const user = new User(id, "nelw@user.com", "secret-password");
        const createdUser = await userRepo.create(user);
        done();

        expect(createdUser.id).toEqual(id);
        expect(createdUser.email).toEqual("nelw@user.com");
        expect(createdUser.password).toEqual("secret-password");
    });
    test("should not create duplicate users", async (done) => {
        const id = newId();
        const user = new User(id, "new@user.com", "secret-password");

        await userRepo.create(user);
        done();

        const duplicateUser = await userRepo.create(user);
        done();
        expect(duplicateUser).not.toBeDefined();
    });
});
