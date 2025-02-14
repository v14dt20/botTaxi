// EventEmitterManager.js
const EventEmitter = require('events');

class EventEmitterManager {
    constructor() {
        this.emitter = new EventEmitter();
    }

    emit(event, data) {
        this.emitter.emit(event, data);
    }

    once(event, callback) {
        this.emitter.once(event, callback);
    }
}

module.exports = new EventEmitterManager();