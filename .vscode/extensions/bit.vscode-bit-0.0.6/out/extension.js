"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const generate_debugger_option_1 = require("./debugger-option/generate-debugger-option");
function activate(context) {
    const commandOpenInBrowser = 'bit.openInBrowser';
    const commandGenerateDebuggerOption = 'bit.generateDebuggerOption';
    context.subscriptions.push(vscode.commands.registerCommand(commandOpenInBrowser, openInBrowser));
    context.subscriptions.push(vscode.commands.registerCommand(commandGenerateDebuggerOption, generate_debugger_option_1.generateDebuggerOption));
}
exports.activate = activate;
function deactivate() {
    console.log('on deactivate');
}
exports.deactivate = deactivate;
function openInBrowser() {
    vscode.env.openExternal(vscode.Uri.parse('https://www.bit.dev/'));
}
//# sourceMappingURL=extension.js.map