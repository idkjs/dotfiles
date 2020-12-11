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
class RunCommand {
    constructor(shellCommandService, commandReader, historyStore, workspaceAdapter) {
        this.shellCommandService = shellCommandService;
        this.commandReader = commandReader;
        this.historyStore = historyStore;
        this.workspaceAdapter = workspaceAdapter;
    }
    execute(wrappedEditor) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = yield this.commandReader.read();
            if (!command)
                return;
            this.historyStore.add(command);
            if (this.shouldPassEntireText(wrappedEditor)) {
                yield this.processEntireText(command, wrappedEditor);
            }
            else {
                yield this.processSelectedText(command, wrappedEditor);
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
exports.default = RunCommand;
//# sourceMappingURL=run-interactive.js.map