"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
const path_1 = require("path");
var CurrentDirectoryKind;
(function (CurrentDirectoryKind) {
    CurrentDirectoryKind["CURRENT_FILE"] = "currentFile";
    CurrentDirectoryKind["WORKSPACE_ROOT"] = "workspaceRoot";
})(CurrentDirectoryKind || (CurrentDirectoryKind = {}));
class ShellCommandExecContext {
    constructor(workspaceAdapter, process) {
        this.process = process;
        this.workspaceAdapter = workspaceAdapter;
    }
    get env() {
        return this.process.env;
    }
    getCwd(filePath) {
        const configPath = `${const_1.EXTENSION_NAME}.currentDirectoryKind`;
        const currentDirectoryKind = this.workspaceAdapter.getConfig(configPath);
        switch (currentDirectoryKind) {
            case CurrentDirectoryKind.CURRENT_FILE:
                return filePath ? path_1.dirname(filePath) : this.env.HOME;
            case CurrentDirectoryKind.WORKSPACE_ROOT:
                return this.workspaceAdapter.rootPath || this.env.HOME;
            default:
                throw new Error(`Unknown currentDirectoryKind: ${currentDirectoryKind}`);
        }
    }
}
exports.default = ShellCommandExecContext;
//# sourceMappingURL=shell-command-exec-context.js.map