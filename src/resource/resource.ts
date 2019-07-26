export const login = (service: any) => async (req: any, res: any) => {
        const token = await service.login({email: req.body.email, password: req.body.password});
        return res.json({
            message: "Authentication successful!",
            success: true,
            token
        });
};
