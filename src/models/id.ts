import {v4 as uuid} from "uuid";

export class Id {
    public id: string;
    constructor() {
        this.id = uuid();
    }
}