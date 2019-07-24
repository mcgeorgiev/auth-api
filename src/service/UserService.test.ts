
import {Id} from "../models/id";
import {User} from "../models/user";
import { UserRepository } from "../models/userRepository";
import {IHttpErrors} from "./errors/HttpErrors";
import {IPasswordService} from "./password/PasswordService";
import { UserService} from "./UserService";

const repoMock = {
    create: () => {},
    find: (email: string) => new User(new Id(), "mock@mock.com", "password")
} as UserRepository;

const passwordServiceMock = {
    comparePasswords: (password, hash) => true
} as IPasswordService;

const errorMock = {
    conflict: new Error("409"),
    internalServerError: new Error("500")
} as IHttpErrors;

describe("UserService", () => {
    test("logs in successfully and receives token", async (done) => {
        const spy = jest.spyOn(repoMock, "find");
        const service = new UserService(repoMock, passwordServiceMock, errorMock);
        const data = { email: "mock@mock.com", password: "password" };

        const token = await service.login(data);
        done();

        expect(spy).toBeCalledWith("mock@mock.com");
        expect(token).toBeDefined();
    });
    test("logs in unsuccessfully", async (done) => {
        passwordServiceMock.comparePasswords = (password, hash) => false;
        const service = new UserService(repoMock, passwordServiceMock, errorMock);
        const data = { email: "wrong@email.com", password: "password" };

        await expect(service.login(data)).rejects.toThrow(errorMock.conflict);
        done();
    });
    test("throws 500 error", async (done) => {
        repoMock.find = (email) => { throw errorMock.internalServerError; };
        const service = new UserService(repoMock, passwordServiceMock, errorMock);
        const data = { email: "mock@mock.com", password: "password" };

        await expect(service.login(data)).rejects.toThrow(errorMock.internalServerError);
        done();
    });
});
