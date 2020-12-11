"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const");
const run_1 = require("./run");
class RunQuickCommand extends run_1.RunCommand {
    constructor(shellCommandService, historyStore, workspaceAdapter, commandNumber) {
        super(shellCommandService, historyStore, workspaceAdapter);
        this.workspace = workspaceAdapter;
        this.commandNumber = commandNumber;
    }
    getCommandText() {
        const commandId = this.workspace.getConfig(`${const_1.EXTENSION_NAME}.quickCommand${this.commandNumber}`);
        const favoriteCommands = this.workspace.getConfig(`${const_1.EXTENSION_NAME}.favoriteCommands`);
        const command = favoriteCommands.find(c => c.id === commandId);
        return Promise.resolve(command && command.command);
    }
}
exports.default = RunQuickCommand;
//# sourceMappingURL=run-quick.js.map