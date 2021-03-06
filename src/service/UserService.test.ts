import {User} from "../models/user";
import { UserRepository } from "../models/userRepository";
import {IHttpErrors} from "./errors/HttpErrors";
import {IPasswordService} from "./password/PasswordService";
import { UserService} from "./UserService";

const repoMock = {
    create: (user: User) => new User("456", "new@mock.com", "password"),
    find: (email: string) => new User("123", "mock@mock.com", "password")
} as UserRepository;

const passwordServiceMock = {
    comparePasswords: (password, hash) => true,
    hashPassword: (password) => "default"
} as IPasswordService;

const errorMock = {
    conflict: new Error("409"),
    internalServerError: new Error("500"),
    unauthorized: new Error("401")
} as IHttpErrors;

const newIdMock = () => "random id";

describe("UserService", () => {
    describe("logs in", () => {
        test("successfully and returns token", async (done) => {
            const spy = jest.spyOn(repoMock, "find");
            const service = new UserService(repoMock, passwordServiceMock, errorMock, newIdMock);
            const data = {email: "mock@mock.com", password: "password"};

            const token = await service.login(data);
            done();

            expect(spy).toBeCalledWith("mock@mock.com");
            expect(token).toBeDefined();
        });
        test("unsuccessfully due to unknown email", async (done) => {
            repoMock.find = (email) => undefined;
            const service = new UserService(repoMock, passwordServiceMock, errorMock, newIdMock);
            const data = {email: "wrong@email.com", password: "password"};

            await expect(service.login(data)).rejects.toThrow(errorMock.unauthorized);
            done();
        });
        test("unsuccessfully due to incorrect password", async (done) => {
            passwordServiceMock.comparePasswords = (password, hash) => false;
            const service = new UserService(repoMock, passwordServiceMock, errorMock, newIdMock);
            const data = {email: "wrong@email.com", password: "password"};

            await expect(service.login(data)).rejects.toThrow(errorMock.unauthorized);
            done();
        });
        test("unsuccessfully due to internal server error", async (done) => {
            repoMock.find = (email) => {
                throw errorMock.internalServerError;
            };
            const service = new UserService(repoMock, passwordServiceMock, errorMock, newIdMock);
            const data = {email: "mock@mock.com", password: "password"};

            await expect(service.login(data)).rejects.toThrow(errorMock.internalServerError);
            done();
        });
    });
    describe("create", () => {
        test("user successfully and returns token", async (done) => {
            const spy = jest.spyOn(repoMock, "create");
            passwordServiceMock.hashPassword = (password) => "hashedPassword";

            const service = new UserService(repoMock, passwordServiceMock, errorMock, newIdMock);
            const data = {email: "new@user.com", password: "password"};

            const token = await service.create(data);
            done();

            expect(spy).toBeCalledWith(new User("random id", "new@user.com", "hashedPassword"));
            expect(token).toBeDefined();
        });
        test("user unsuccessfully when email already exists", async (done) => {
            repoMock.create = (user) => undefined;
            passwordServiceMock.hashPassword = (password) => "hashedPassword";

            const service = new UserService(repoMock, passwordServiceMock, errorMock, newIdMock);
            const data = {email: "new@user.com", password: "password"};

            await expect(service.create(data)).rejects.toThrow(errorMock.conflict);
            done();
        });
        test("user unsuccessfully when internal server error", async (done) => {
            repoMock.create = (user) => {
                throw errorMock.internalServerError;
            };
            const service = new UserService(repoMock, passwordServiceMock, errorMock, newIdMock);
            const data = {email: "new@user.com", password: "password"};

            await expect(service.create(data)).rejects.toThrow(errorMock.internalServerError);
            done();
        });
    });
});
