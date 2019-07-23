import request from "supertest";
import app from "./app";

describe("POST /login ", () => {
    test("can issue jwt", async () => {
        const response = await request(app)
            .post("/login")
            .send({
                email: "test@test.com",
                password: "password"
        });

        // expect(response.body).toEqual(["Elie", "Matt", "Joel", "Michael"]);
        expect(response.status).toBe(200);
    });
});