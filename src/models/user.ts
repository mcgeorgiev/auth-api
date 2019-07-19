import {Id} from "./id";

export class User {
    public id: Id;
    public email: string;
    public password: string;

    constructor(id: Id, email: string, password: string) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
}