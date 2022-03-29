import { WebSocketFunction } from "../types/index";
import { nanoid } from "nanoid";
import { User } from "../types";
import * as jwt from "jsonwebtoken";
import * as config from '../config.json';

export default new WebSocketFunction({
    id: "joinRoom",
    call: (content, socket, server) => {
        if (content && content.room && content.name) {
            if (server.roomMap.has(content.room)) {
                if (server.roomMap.get(content.room)?.namereg.has(content.name)) {
                    socket.emit('error', 'Name already in use');
                }
                else {
                    let id = nanoid(10);
                    let user = new User({ id: id, name: content.name, room: content.room, socket: socket.id });
                    server.roomMap.get(content.room)?.addUser(user);
                    server.socketMap.set(socket.id, user);
                    let token = jwt.sign(JSON.stringify(user), config.token_secret);
                    socket.emit('auth', token);
                }
            }
            else {
                socket.emit('error', 'Room not found');
            }
        }
        else {
            socket.emit('error', 'Empty room code/name');
        }
    }
});
