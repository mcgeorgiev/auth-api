import bcrypt from "bcrypt";
import {BCryptPasswordService} from "./PasswordService";

describe("BCrypt Password Service", () => {
    test("compares password", async () => {
        const hash = await bcrypt.hash("password", 10);
        expect(BCryptPasswordService.comparePasswords("password", hash)).toBeTruthy();
    });
});