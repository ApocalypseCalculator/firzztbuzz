export default class Buzzer {
    started: boolean;
    time: Number;
    constructor() {
        this.started = false;
        this.time = Date.now();
    }
}