"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const command_1 = require("./command");
const provider_1 = require("./provider");
exports.activate = (context) => {
    const provider = new provider_1.default();
    context.subscriptions.push(vscode_1.commands.registerCommand("extension.runMakeCommand", command_1.runMakeCommand()), vscode_1.window.registerTreeDataProvider("makefiles-runner", provider));
};
exports.deactivate = () => { };
//# sourceMappingURL=extension.js.map