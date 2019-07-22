import {Id} from "../models/id";
import {User} from "../models/user";
import { UserRepository } from "../models/userRepository";
import {IPasswordService, UserService} from "./UserService";

const repoMock = {
    create: () => {},
    find: (email: string) => new User(new Id(), "mock@mock.com", "password")
} as UserRepository;

const passwordServiceMock = {
    comparePasswords: (password, hash) => true
} as IPasswordService;

describe("UserService", () => {
    test("logs in successfully and receives token", () => {
        const spy = jest.spyOn(repoMock, "find");
        const service = new UserService(repoMock, passwordServiceMock);
        const data = { email: "mock@mock.com", password: "password" };

        const token = service.login(data);
        expect(spy).toBeCalledWith("mock@mock.com");
        expect(token).toBeDefined();
    });
    test("logs in in unsuccessfully", () => {
        passwordServiceMock.comparePasswords = (password, hash) => false;
        const service = new UserService(repoMock, passwordServiceMock);
        const data = { email: "mock@mock.com", password: "password" };
        expect(() => {
            service.login(data);
        }).toThrow(new Error("Unsuccessful."));
    });
});
