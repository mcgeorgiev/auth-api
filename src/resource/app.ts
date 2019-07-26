import {disconnect} from "cluster";

const bodyParser = require("body-parser");
const express = require("express");
import {PostgresUserRepository} from "../infra/infra";
import {HttpErrors as errors} from "../service/errors/HttpErrors";
import {BCryptPasswordService} from "../service/password/PasswordService";
import {UserService} from "../service/UserService";
import {login} from "./resource";

const knex = require("knex");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbClient = knex({
  client: "pg",
  connection: "postgres://postgres:postgres@localhost:5432/my_db"
});


class App {
    private db: any;
    private app: any;
    private userService: any;

    constructor(db: any, app: any) {
        this.db = db;
        this.app = app;

        const userRepo = new PostgresUserRepository(db);
        this.userService = new UserService(userRepo, BCryptPasswordService, errors);
        this.app.post("/login", login(this.userService));

    }

    public disconnect() {
        console.log("*********************************")
        this.db.disconnect();
    }

    public create() {
        return this.app;
    }
}

export default new App(dbClient, app);
