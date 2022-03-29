import { WebSocketFunction } from "../types/index";
import { nanoid } from "nanoid";
import { User, Room } from "../types";
import * as jwt from "jsonwebtoken";
import * as config from '../config.json';

export default new WebSocketFunction({
    id: "createRoom",
    call: (content, socket, server) => {
        if(!content || !content.room || !content.name) {
            socket.emit('error', 'Empty room code/name');
        }
        else if(!/[a-z0-9-]{4,30}/.test(content.room)) {
            socket.emit('error', 'Room code must be between 4 to 30 characters long and can only contain alphanumeric characters and hyphens');
        }
        else {
            if(server.roomMap.has(content.room)) {
                socket.emit('error', 'Room already exists');
            }
            else {
                let id = nanoid(10);
                let user = new User({
                    id: id,
                    name: content.name,
                    room: content.room,
                    socket: socket.id,
                    mod: true
                });
                let room = new Room(content.room);
                room.addUser(user);
                server.roomMap.set(content.room, room);
                server.socketMap.set(socket.id, user);
                let token = jwt.sign(JSON.stringify(user), config.token_secret);
                socket.emit('auth', token);
            }
        }
    }
});
