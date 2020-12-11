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
const parser_1 = require("./parser");
class TaskTreeDataProvider {
    getTreeItem(item) {
        return item;
    }
    getChildren() {
        return __awaiter(this, void 0, void 0, function* () {
            const children = [];
            if (vscode_1.workspace.rootPath) {
                const filePath = `${vscode_1.workspace.rootPath}/Makefile`;
                const commands = yield parser_1.default(filePath);
                if (commands.length !== 0) {
                    for (let i = 0; i < commands.length; i++) {
                        children.push(new MakefileCommand(commands[i]));
                    }
                }
            }
            return children;
        });
    }
}
exports.default = TaskTreeDataProvider;
class MakefileCommand extends vscode_1.TreeItem {
    constructor(label) {
        super(label, vscode_1.TreeItemCollapsibleState.None);
        this.command = {
            command: "extension.runMakeCommand",
            title: "Run Makefile Command",
            arguments: [label]
        };
    }
}
//# sourceMappingURL=provider.js.map