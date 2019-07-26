import knex from "knex";
import {PostgresUserRepository} from "../infra/infra";
import {newId} from "../models/id";
import {login} from "../resource/resource";
import {HttpErrors as errors} from "../service/errors/HttpErrors";
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

describe("Resource - Service - Infra Integration", () => {
    test("Can return successful json response", async (done) => {
        await createTestUser(dbConnection);

        const service = new UserService(userRepo, passwordServiceMock, errors, newId);
        const req = {body: { email: "existing@user.com", password: "password" }};
        const res = {
            json: (args: any) => args
        };

        const result = await login(service)(req, res);
        done();

        expect(result.message).toEqual("Authentication successful!");
        expect(result.success).toEqual(true);
        expect(result.token).toBeDefined();
    });
});
