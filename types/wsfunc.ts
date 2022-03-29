import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import ServerInstance from "./serverinstance";

export default class WebSocketFunction {
    id: string;
    call: (content: any, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, server: ServerInstance) => void;

    constructor({ id, call }: { id: string, call: (content: any, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, server: ServerInstance) => void }) {
        this.id = id;
        this.call = call;
    }
}