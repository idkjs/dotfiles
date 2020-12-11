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
const vscode_1 = require("vscode");
const extractCommands = (filePath) => getFileContent(filePath).then(buildCommands);
exports.default = extractCommands;
const getFileContent = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    let document;
    try {
        document = yield vscode_1.workspace.openTextDocument(filePath);
    }
    catch (e) {
        throw new Error('Makefile cannot be read. Check that your makefile is at the root of your project.');
    }
    const content = document.getText().split("\n");
    return content;
});
const buildCommands = (content) => {
    const commands = [];
    for (let i = 0; i < content.length; i++) {
        const line = content[i];
        const separator = ": ##";
        if (line.indexOf(": ##") !== -1) {
            const command = line.split(separator)[0];
            commands.push(command);
        }
    }
    return commands;
};
//# sourceMappingURL=parser.js.map