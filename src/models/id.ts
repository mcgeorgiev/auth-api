import {v4 as uuid} from "uuid";

export class Id {
    public id: string;
    constructor() {
        this.id = uuid();
    }
    public toString = (): string => {
        return this.id;
    }
}

export const newId = () => uuid();
