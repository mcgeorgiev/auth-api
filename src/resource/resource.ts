export const login = (service: any) => (req: any, res: any) => {
    const token = service.login(req.body.email, req.body.password);
    return res.json({
        message: "Authentication successful!",
        success: true,
        token
      });
};
