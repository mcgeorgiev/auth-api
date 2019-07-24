import request from "supertest";
import app from "./app";

describe("POST /login ", () => {
    test("can issue jwt", async (done) => {
        const response = await request(app)
            .post("/login")
            .send({
                email: "test@test.com",
                password: "password"
        });
        done();
        console.log(response)
        // expect(response.body).toEqual(["Elie", "Matt", "Joel", "Michael"]);
        // expect(response.status).toBe(200);
    });
});