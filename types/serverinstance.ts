import { Server } from "socket.io";
import Room from "./room";
import User from "./user";

export default class ServerInstance {
    roomMap: Map<string, Room>;
    socketMap: Map<string, User>;
    server: Server;
    constructor({ server }: { server: Server }) {
        this.roomMap = new Map<string, Room>();
        this.socketMap = new Map<string, User>();
        this.server = server;
    }
}