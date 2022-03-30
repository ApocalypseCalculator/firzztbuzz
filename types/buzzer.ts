export default class Buzzer {
    started: boolean;
    time: number;
    textrequired: boolean;
    ispublic: boolean;
    constructor() {
        this.started = false;
        this.time = Date.now();
        this.textrequired = false;
        this.ispublic = false;
    }
}