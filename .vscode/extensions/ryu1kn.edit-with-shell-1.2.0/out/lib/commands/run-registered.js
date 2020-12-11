"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const");
class RunQuickCommand {
    constructor(shellCommandService, historyStore, workspaceAdapter) {
        this.shellCommandService = shellCommandService;
        this.historyStore = historyStore;
        this.workspaceAdapter = workspaceAdapter;
    }
    execute(wrappedEditor) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandId = this.workspaceAdapter.getConfig(`${const_1.EXTENSION_NAME}.quickCommand1`);
            const favoriteCommands = this.workspaceAdapter.getConfig(`${const_1.EXTENSION_NAME}.favoriteCommands`);
            const command = favoriteCommands.find(c => c.id === commandId);
            if (!command)
                return;
            const commandText = command.command;
            this.historyStore.add(commandText);
            if (this.shouldPassEntireText(wrappedEditor)) {
                yield this.processEntireText(commandText, wrappedEditor);
            }
            else {
                yield this.processSelectedText(commandText, wrappedEditor);
            }
        });
    }
    processSelectedText(command, wrappedEditor) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandOutput = yield this.shellCommandService.runCommand({
                command,
                input: wrappedEditor.selectedText,
                filePath: wrappedEditor.filePath
            });
            yield wrappedEditor.replaceSelectedTextWith(commandOutput);
        });
    }
    processEntireText(command, wrappedEditor) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandOutput = yield this.shellCommandService.runCommand({
                command,
                input: wrappedEditor.entireText,
                filePath: wrappedEditor.filePath
            });
            yield wrappedEditor.replaceEntireTextWith(commandOutput);
        });
    }
    shouldPassEntireText(wrappedEditor) {
        const processEntireText = this.workspaceAdapter.getConfig(`${const_1.EXTENSION_NAME}.processEntireTextIfNoneSelected`);
        return !wrappedEditor.isTextSelected && processEntireText;
    }
}
exports.default = RunQuickCommand;
//# sourceMappingURL=run-registered.js.map