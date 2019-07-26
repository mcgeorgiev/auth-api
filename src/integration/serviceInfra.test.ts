import knex from "knex";
import {PostgresUserRepository} from "../infra/infra";
import {newId} from "../models/id";
import { HttpErrors as errors } from "../service/errors/HttpErrors";
import {IPasswordService} from "../service/password/PasswordService";
import {UserService} from "../service/UserService";
import {createTestUser} from "../testHelpers";

let userRepo: PostgresUserRepository;
let dbConnection: any;

const passwordServiceMock = {
    comparePasswords: (password, hash) => true
} as IPasswordService;

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

describe("Service can communicate with Database", () => {
    test("should retrieve jwt for existing user", async (done) => {
        await createTestUser(dbConnection);
        done();

        const service = new UserService(userRepo, passwordServiceMock, errors, newId);
        const token = await service.login({ email: "existing@user.com", password: "password"});
        done();
        expect(token).toBeDefined();
    });
    test("should not retrieve jwt for unknown user email", async (done) => {
        const service = new UserService(userRepo, passwordServiceMock, errors, newId);
        done();
        await expect(service.login({ email: "no@user.com", password: "password"})).rejects.toThrow(errors.unauthorized);
    });
    test("should not retrieve jwt for incorrect password", async (done) => {
        await createTestUser(dbConnection);
        done();

        passwordServiceMock.comparePasswords = (password, hash) => false;
        const service = new UserService(userRepo, passwordServiceMock, errors, newId);
        done();
        await expect(
            service.login({ email: "existing@user.com", password: "no passwotd"})).rejects.toThrow(errors.unauthorized);
    });
});
