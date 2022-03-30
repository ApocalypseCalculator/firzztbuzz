import { WebSocketFunction } from "../types/index";

export default new WebSocketFunction({
    id: "disconnect",
    call: (content, socket, server) => {
        let user = server.socketMap.get(socket.id);
        if (user) {
            if(server.roomMap.has(user.room)) {
                server.roomMap.get(user.room)?.deleteUser(user);
                server.roomMap.get(user.room)?.users.forEach((v, k) => {
                    if (v.mod) {
                        server.server.sockets.to(`${v.socket}`).emit('leave', `${user?.name}`);
                    }
                })
            }
        }
    }
});
