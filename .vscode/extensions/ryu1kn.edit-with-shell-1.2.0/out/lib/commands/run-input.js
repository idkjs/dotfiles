"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_1 = require("./run");
class RunInputCommand extends run_1.RunCommand {
    constructor(shellCommandService, commandReader, historyStore, workspaceAdapter) {
        super(shellCommandService, historyStore, workspaceAdapter);
        this.commandReader = commandReader;
    }
    getCommandText() {
        return this.commandReader.read();
    }
}
exports.default = RunInputCommand;
//# sourceMappingURL=run-input.js.map