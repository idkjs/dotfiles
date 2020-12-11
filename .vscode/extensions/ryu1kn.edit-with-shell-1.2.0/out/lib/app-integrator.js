"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
class AppIntegrator {
    constructor(runCommand, clearHistoryCommand, createQuickCommand, vscode) {
        this.vscode = vscode;
        this.runCommand = runCommand;
        this.createQuickCommand = createQuickCommand;
        this.clearHistoryCommand = clearHistoryCommand;
    }
    integrate(context) {
        this.registerCommands(context);
        this.registerTextEditorCommands(context);
    }
    registerCommands(context) {
        const disposable = this.vscode.commands.registerCommand(`${const_1.EXTENSION_NAME}.clearCommandHistory`, this.clearHistoryCommand.execute, this.clearHistoryCommand);
        context.subscriptions.push(disposable);
    }
    registerTextEditorCommands(context) {
        this.textEditorCommands.forEach(command => {
            const disposable = this.vscode.commands.registerTextEditorCommand(command.id, command.command.execute, command.command);
            context.subscriptions.push(disposable);
        });
    }
    get textEditorCommands() {
        return [
            {
                id: `${const_1.EXTENSION_NAME}.runCommand`,
                command: this.runCommand
            },
            ...[1, 2, 3, 4, 5].map(n => ({
                id: `${const_1.EXTENSION_NAME}.runQuickCommand${n}`,
                command: this.createQuickCommand(n)
            }))
        ];
    }
}
exports.default = AppIntegrator;
//# sourceMappingURL=app-integrator.js.map