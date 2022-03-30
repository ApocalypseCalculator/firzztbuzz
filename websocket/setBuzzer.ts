import { WebSocketFunction } from "../types/index";
import { nanoid } from "nanoid";
import { User } from "../types";
import * as jwt from "jsonwebtoken";
import * as config from '../config.json';

export default new WebSocketFunction({
    id: "setBuzzer",
    call: (content, socket, server) => {
        socket.emit('error', 'hello');
    },
    auth: true
});
