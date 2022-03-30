import { Socket } from "socket.io";
import ServerInstance from "./serverinstance";
import * as jwt from "jsonwebtoken";
import * as config from '../config.json';
import User from "./user";

export default class WebSocketFunction {
    id: string;
    call: (content: any, socket: Socket, server: ServerInstance) => void;

    constructor({ id, call, auth }:
        {
            id: string,
            call: (content: any, socket: Socket, server: ServerInstance) => void
            auth?: boolean
        }) {
        this.id = id;
        this.call = (content: any, socket: Socket, server: ServerInstance) => {
            if (!auth) {
                call(content, socket, server);
            }
            else if (content && content.auth) {
                jwt.verify(content.auth, config.token_secret, function (err: any, decoded: any) {
                    if (err) {
                        socket.emit('error', 'Authorization error');
                    }
                    else {
                        content.authUser = decoded as User;
                        call(content, socket, server);
                    }
                });
            }
            else {
                socket.emit('error', 'No authorization');
            }
        };
    }
}