import { WebSocketFunction } from "../types/index";
import { User } from "../types";

export default new WebSocketFunction({
    id: "setBuzzer",
    call: (content, socket, server) => {
        let user = content.authUser as User;
        let room = server.roomMap.get(user.room);
        if (!room!.buzzer.started) {
            socket.emit('error', 'Buzzer has not been started or has ended already');
        }
        else {
            let timetaken = Date.now() - room!.buzzer.time;
            room!.users.forEach((v, k) => {
                if (room!.buzzer.ispublic || v.mod || v.id == user.id) {
                    server.server.sockets.to(v.socket).emit('buzz', { user: user, timetaken: timetaken });
                }
            });
        }
    },
    auth: true
});
