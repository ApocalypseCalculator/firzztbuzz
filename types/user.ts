export default class User {
    id: string;
    name: string;
    room: string;
    socket: string;
    mod: boolean;
    constructor({ id, name, room, socket, mod }: { id: string, name: string, room: string, socket: string, mod?: boolean }) {
        this.id = id;
        this.name = name;
        this.room = room;
        this.socket = socket;
        this.mod = mod ?? false;
    }
}
