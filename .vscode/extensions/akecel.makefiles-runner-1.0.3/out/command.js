"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMakeCommand = exports.getFilePath = void 0;
const vscode_1 = require("vscode");
const terminal_1 = require("./terminal");
exports.getFilePath = (path, workspaceRootPath) => path.split(workspaceRootPath + "/")[1];
exports.runMakeCommand = () => (argument) => __awaiter(void 0, void 0, void 0, function* () {
    sendTextsToTerminal([
        `cd ${vscode_1.workspace.rootPath}/`,
        `make ${argument}`
    ]);
});
const sendTextToTerminal = (text) => __awaiter(void 0, void 0, void 0, function* () {
    if (terminal_1.ensureTerminalExists()) {
        const terminal = yield terminal_1.selectTerminal();
        if (terminal) {
            terminal.sendText(text);
        }
    }
});
const sendTextsToTerminal = (texts) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < texts.length; i++) {
        sendTextToTerminal(texts[i]);
    }
});
//# sourceMappingURL=command.js.map