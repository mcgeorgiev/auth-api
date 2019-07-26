export const createTestUser = (dbConnection: any) => dbConnection.raw("insert into users values ('1', 'existing@user.com', 'password')");
