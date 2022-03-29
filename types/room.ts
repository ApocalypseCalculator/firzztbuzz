import Buzzer from "./buzzer";
import User from "./user";

export default class Room {
    id: string;
    users: Map<string, User>;
    namereg: Map<string, boolean>;
    buzzer: Buzzer;
    constructor({id} : {id: string}) {
        this.id = id;
        this.buzzer = new Buzzer();
        this.users = new Map<string, User>();
        this.namereg = new Map<string, boolean>();
    }
    addUser(user: User) {
        this.users.set(user.id, user);
        this.namereg.set(user.name, true);
    }
    deleteUser(user: User) {
        this.users.delete(user.id);
        this.namereg.delete(user.name);
    }
}