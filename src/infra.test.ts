import knex from "knex";
// import { Id, User } from "./models";
import {PostgresUserRepository} from "./infra";

const client = knex({
    client: "pg",
    connection: "postgres://postgres:postgres@localhost:5432/my_db"
});

afterAll(() => {
    client.destroy();
})

describe("User", () => {
    test("should be created", async (done) => {
        const user = await new PostgresUserRepository(client).find("test@test.com");
        done();
        expect(user.email).toEqual("test@test.com");
    });
});
