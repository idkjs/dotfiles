"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const vscode_1 = require("vscode");
const httpCodeLensProvider_1 = require("./httpCodeLensProvider");
const httpieCompletion_1 = require("./httpieCompletion");
const requestController_1 = require("./requestController");
let requestController = new requestController_1.RequestController();
function activate(context) {
    context.subscriptions.push(vscode_1.commands.registerCommand("httpie-client.request", ((document, range) => requestController.run(range))));
    context.subscriptions.push(vscode_1.languages.registerCodeLensProvider("httpie", new httpCodeLensProvider_1.HttpCodeLensProvider()));
    let selector = [{
            pattern: "**/*.httpie"
        }];
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, new httpieCompletion_1.HttpieCompletion(), ""));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map