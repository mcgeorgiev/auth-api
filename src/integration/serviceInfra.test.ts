import knex from "knex";
import {UserService} from "../service/UserService";
import { HttpErrors as errors } from "../service/errors/HttpErrors";
import {IPasswordService} from "../service/password/PasswordService";
import {PostgresUserRepository} from "../infra/infra";

const dbConnection = knex({
    client: "pg",
    connection: "postgres://postgres:postgres@localhost:5432/my_db"
});

let userRepo: PostgresUserRepository;

const passwordServiceMock = {
    comparePasswords: (password, hash) => true
} as IPasswordService;

beforeAll(() => {
    userRepo = new PostgresUserRepository(dbConnection);
});

afterAll(() => {
    dbConnection.destroy();
});

describe("Service can communicate with Database", () => {
    test("should retrieve jwt for existing user", async (done) => {
        const service = new UserService(userRepo, passwordServiceMock, errors);
        const token = await service.login({ email: "test@test.com", password: "password"});
        done();
        expect(token).toBeDefined();
    });
    test("should not retrieve jwt for unknown user email", async (done) => {
        const service = new UserService(userRepo, passwordServiceMock, errors);
        done();
        await expect(service.login({ email: "no@user.com", password: "password"})).rejects.toThrow(errors.conflict);
    });
    test("should not retrieve jwt for incorrect password", async (done) => {
        passwordServiceMock.comparePasswords = (password, hash) => false;
        const service = new UserService(userRepo, passwordServiceMock, errors);
        done();
        await expect(
            service.login({ email: "test@test.com", password: "no passwotd"})).rejects.toThrow(errors.conflict);
    });
});
