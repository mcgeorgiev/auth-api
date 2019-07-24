import {login} from "./resource";

const mockRequest = (email: string, password: string) => {
    return {
        body: { email, password }
    };
};

const mockResponse = () => {
    return { json: jest.fn().mockReturnValue({default: "response"}) };
};

const mockUserService = {
    login: jest.fn((email: any, password: any) => "default")
};

describe("User Resource", () => {
    test("returns auth token json", async (done) => {
        const req = mockRequest("test@email.com", "password");
        const res = mockResponse();
        const token = "A JWT!";
        mockUserService.login.mockImplementation((email: any, password: any) => token);

        const response = await login(mockUserService)(req, res);
        done();

        expect(mockUserService.login).toBeCalledWith("test@email.com", "password");
        expect(res.json).toHaveBeenCalledWith({
            message: "Authentication successful!",
            success: true,
            token
        });
    });
    test("returns a 403 error if incorrect credentials", async () => {
        // const req = mockRequest("test@email.com", "password");
        // const res = mockResponse();
        // const token = "A JWT!";
        // mockUserService.login.mockImplementation((email: any, password: any) => { throw new Error() });
        //
        // await login(req, res, mockUserService);
        //
        // expect(mockUserService.login).toBeCalledWith("test@email.com", "password");
        // expect(res.json).toHaveBeenCalledWith({
        //     message: "Authentication successful!",
        //     success: true,
        //     token
        // });
    });
    // 400
});
