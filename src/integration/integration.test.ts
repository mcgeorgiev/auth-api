import request from "supertest";
import App from "../resource/app";

describe("POST /login ", () => {
    test("can issue jwt", (done) => {
        const app = App.create()
        const response = request(app)
            .post("/login")
            .send({
                email: "test@test.com",
                password: "password"
            })
            .expect(200, done);

            // .end(function(err, res) {
            //     console.log("err")
            //     if (err) return done(err);
            //     done();
            // });
        // App.disconnect()
        // done();
        // expect(response.status).toBe(200);
    });
});
