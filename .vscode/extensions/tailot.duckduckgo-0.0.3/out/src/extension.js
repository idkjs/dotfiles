'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const search = require("./search");
function activate(context) {
    let disposable = vscode.commands.registerCommand('duckduckgo.webSearch', () => search.DuckDuckGoController.webSearch());
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('duckduckgo.imagesSearch', () => search.DuckDuckGoController.imagesSearch());
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('duckduckgo.videosSearch', () => search.DuckDuckGoController.videosSearch());
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('duckduckgo.bangSearch', () => search.DuckDuckGoController.bangSearch());
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map