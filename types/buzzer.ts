export default class Buzzer {
    started: boolean;
    time: Number;
    textrequired: boolean;
    ispublic: boolean;
    constructor() {
        this.started = false;
        this.time = Date.now();
        this.textrequired = false;
        this.ispublic = false;
    }
}