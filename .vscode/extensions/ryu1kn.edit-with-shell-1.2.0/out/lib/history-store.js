"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HistoryStore {
    constructor() {
        this.history = [];
    }
    getAll() {
        return this.history;
    }
    clear() {
        this.history = [];
    }
    add(command) {
        const history = this.history;
        const index = history.indexOf(command);
        if (index === -1) {
            this.history = [...history, command];
            return;
        }
        this.history = [...history.slice(0, index), ...history.slice(index + 1), command];
    }
}
exports.default = HistoryStore;
//# sourceMappingURL=history-store.js.map