"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandExecutionError extends Error {
    constructor(message, code, command, errorOutput) {
        super(message);
        this.code = code;
        this.command = command;
        this.errorOutput = errorOutput;
    }
}
exports.default = CommandExecutionError;
//# sourceMappingURL=command.js.map