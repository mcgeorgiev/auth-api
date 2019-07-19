import uuidv4 from "uuid/v4";

export class Id {
    public id: string;
    constructor() {
        this.id = uuidv4();
    }
}