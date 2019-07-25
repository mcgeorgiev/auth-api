import knex from "knex";
import {PostgresUserRepository} from "../infra/infra";
import {login} from "../resource/resource";
import {HttpErrors as errors} from "../service/errors/HttpErrors";
import {IPasswordService} from "../service/password/PasswordService";
import {UserService} from "../service/UserService";

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

describe("Resource - Service - Infra Integration", () => {
    test("Can return successful json response", async (done) => {
        const service = new UserService(userRepo, passwordServiceMock, errors);
        const req = {body: { email: "test@test.com", password: "password" }};
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
