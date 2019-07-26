const bcrypt = require('bcrypt');
import {BCryptPasswordService} from "./PasswordService";

describe("BCrypt Password Service", () => {
    test("compares password", async () => {
        const hash = await bcrypt.hash("password", 10);
        expect(BCryptPasswordService.comparePasswords("password", hash)).toBeTruthy();
    });

    test("hashes password", async () => {
        const password = "password"
        const hash = await BCryptPasswordService.hashPassword(password);
        expect(bcrypt.compareSync(password, hash)).toBeTruthy();
    });
});