import {login, create} from "./resource";

const mockRequest = (email: string, password: string) => {
    return {
        body: { email, password }
    };
};

const mockResponse = () => {
    return { json: jest.fn().mockReturnValue({default: "response"}) };
};

const mockUserService = {
    create: jest.fn((email: any, password: any) => "default"),
    login: jest.fn((email: any, password: any) => "default")
};

describe("User Resource", () => {
    describe("login", () => {
        test("returns auth token json", async (done) => {
            const req = mockRequest("test@email.com", "password");
            const res = mockResponse();
            const token = "A JWT!";
            mockUserService.login.mockImplementation((email: any, password: any) => token);

            await login(mockUserService)(req, res);
            done();
            expect(mockUserService.login).toBeCalledWith({email: "test@email.com", password: "password"});
            expect(res.json).toHaveBeenCalledWith({
                message: "Authentication successful!",
                success: true,
                token
            });
        });
        test("returns a 401 error if incorrect credentials", async () => {
        });
        test("returns a 400 error if incorrect credentials", async () => {
        });
    });
    describe("create", () => {
        test("returns auth token json", async (done) => {
            const req = mockRequest("test@email.com", "password");
            const res = mockResponse();
            const token = "A JWT!";
            mockUserService.create.mockImplementation((email: any, password: any) => token);

            await create(mockUserService)(req, res);
            done();
            expect(mockUserService.create).toBeCalledWith({email: "test@email.com", password: "password"});
            expect(res.json).toHaveBeenCalledWith({
                message: "Authentication successful!",
                success: true,
                token
            });
        });
    })
});
