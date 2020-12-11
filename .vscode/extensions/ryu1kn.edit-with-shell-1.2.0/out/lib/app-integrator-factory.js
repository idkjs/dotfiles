"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_integrator_1 = require("./app-integrator");
const editor_1 = require("./adapters/editor");
const shell_command_service_1 = require("./shell-command-service");
const command_reader_1 = require("./command-reader");
const history_store_1 = require("./history-store");
const process_runner_1 = require("./process-runner");
const run_input_1 = require("./commands/run-input");
const clear_history_1 = require("./commands/clear-history");
const workspace_1 = require("./adapters/workspace");
const vscode = require("vscode");
const vscode_1 = require("vscode");
const command_wrap_1 = require("./command-wrap");
const run_quick_1 = require("./commands/run-quick");
const childProcess = require('child_process');
class AppIntegratorFactory {
    constructor() {
        this.cache = {};
    }
    create() {
        return new app_integrator_1.default(this.runCommand, this.clearHistoryCommand, this.createQuickCommand, vscode);
    }
    get runCommand() {
        return this.wrapCommand(new run_input_1.default(this.shellCommandService, new command_reader_1.default(this.historyStore, vscode.window), this.historyStore, this.workspaceAdapter));
    }
    get createQuickCommand() {
        return (commandNumber) => this.wrapCommand(new run_quick_1.default(this.shellCommandService, this.historyStore, this.workspaceAdapter, commandNumber));
    }
    get clearHistoryCommand() {
        return this.wrapCommand(new clear_history_1.default(this.historyStore));
    }
    wrapCommand(command) {
        return new command_wrap_1.default(command, (editor) => new editor_1.default(editor, this.locationFactory), (message) => vscode.window.showErrorMessage(message), console);
    }
    get historyStore() {
        this.cache.historyStore = this.cache.historyStore || new history_store_1.default();
        return this.cache.historyStore;
    }
    get shellCommandService() {
        const workspaceAdapter = this.workspaceAdapter;
        return new shell_command_service_1.default(new process_runner_1.default(), workspaceAdapter, process, childProcess);
    }
    get locationFactory() {
        return {
            createPosition: (line, character) => new vscode_1.Position(line, character),
            createRange: (p1, p2) => new vscode_1.Range(p1, p2)
        };
    }
    get workspaceAdapter() {
        this.cache.workspaceAdapter = this.cache.workspaceAdapter ||
            new workspace_1.default(vscode.workspace);
        return this.cache.workspaceAdapter;
    }
}
exports.default = AppIntegratorFactory;
//# sourceMappingURL=app-integrator-factory.js.map