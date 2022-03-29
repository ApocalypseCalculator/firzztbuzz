import { Server } from "socket.io";
import { ServerInstance } from "./types";
import WebsocketEndpoints from "./websocket";

export default function (io: Server) {
    const server = new ServerInstance({ server: io });
    server.server.on("connection", (socket) => {
        WebsocketEndpoints.forEach(end => {
            socket.on(end.id, (content) => {
                end.call(content, socket, server);
            });
        })
    });
}
