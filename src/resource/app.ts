const bodyParser = require("body-parser");
const express = require("express");
import {login} from "./resource";
import {UserService} from "../service/UserService";
import {BCryptPasswordService} from "../service/password/PasswordService";
import {PostgresUserRepository} from "../infra/infra";
import {HttpErrors} from "../service/errors/HttpErrors";

const knex = require("knex");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbClient = knex({
  client: "pg",
  connection: "postgres://postgres:postgres@localhost:5432/my_db"
});

const userService = new UserService(new PostgresUserRepository(dbClient), BCryptPasswordService, HttpErrors);
app.post("/login", login(userService));

export default app;
