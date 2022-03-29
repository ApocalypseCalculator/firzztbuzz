import Buzzer from "./buzzer";
import User from "./user";

export default class Room {
    id: string;
    users: Map<string, User>;
    buzzer: Buzzer;
    constructor({id} : {id: string}) {
        this.id = id;
        this.buzzer = new Buzzer();
        this.users = new Map<string, User>();
    }
    addUser(user: User) {
        this.users.set(user.id, user);
    }
    deleteUser(user: User) {
        this.users.delete(user.id);
    }
}