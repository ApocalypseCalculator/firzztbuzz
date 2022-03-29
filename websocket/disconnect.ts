import { WebSocketFunction } from "../types/index";
import { nanoid } from "nanoid";
import { User, Room } from "../types";
import * as jwt from "jsonwebtoken";
import * as config from '../config.json';

export default new WebSocketFunction({
    id: "disconnect",
    call: (content, socket, server) => {
        let user = server.socketMap.get(socket.id);
        if (user) {
            if(server.roomMap.has(user.room)) {
                // @ts-ignore
                server.roomMap.get(user.room).deleteUser(user.id);
                // @ts-ignore
                server.roomMap.get(user.room).users.forEach((v, k) => {
                    if (v.mod) {
                        // @ts-ignore
                        server.server.sockets.to(`${v.socket}`).emit('leave', `${user.name}`);
                    }
                })
            }
        }
    }
});
