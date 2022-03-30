import { WebSocketFunction } from "../types/index";
import { User } from "../types";

export default new WebSocketFunction({
    id: "setBuzzer",
    call: (content, socket, server) => {
        let user = content.authUser as User;
        if(!user.mod) {
            socket.emit('error', 'You are not a moderator of this room');
        }
        else {
            if(content.action === "reset") {
                server.roomMap.get(user.room)!.buzzer.started = false;
                server.roomMap.get(user.room)!.buzzer.time = 0;
                socket.emit("message", "success");
            }
            else if(content.action === "setpublic") {
                server.roomMap.get(user.room)!.buzzer.ispublic = true;
                socket.emit("message", "success");
            }
            else if(content.action === "setprivate") {
                server.roomMap.get(user.room)!.buzzer.ispublic = false;
                socket.emit("message", "success");
            }
            else if(content.action === "setrequiretext") {
                server.roomMap.get(user.room)!.buzzer.textrequired = true;
                socket.emit("message", "success");
            }
            else if(content.action === "setnorequiretext") {
                server.roomMap.get(user.room)!.buzzer.textrequired = false;
                socket.emit("message", "success");
            }
            else {
                socket.emit("error", "Invalid action");
            }
        }
        socket.emit('error', 'hello');
    },
    auth: true
});
