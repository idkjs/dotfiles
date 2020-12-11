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
    constructor(shellCommandService, historyStore, workspaceAdapter) {
        this.shellCommandService = shellCommandService;
        this.historyStore = historyStore;
        this.workspaceAdapter = workspaceAdapter;
    }
    execute(wrappedEditor) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = yield this.getCommandText();
            if (!command)
                return;
            this.historyStore.add(command);
            if (this.shouldPassEntireText(wrappedEditor)) {
                yield this.processEntireText(command, wrappedEditor);
            }
            else {
                yield this.processSelectedTexts(command, wrappedEditor);
            }
        });
    }
    processSelectedTexts(command, wrappedEditor) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = wrappedEditor.filePath;
            const promiseOfCommandOutputs = wrappedEditor.selectedTexts
                .map(input => this.shellCommandService.runCommand({ command, input, filePath }));
            const commandOutputs = yield Promise.all(promiseOfCommandOutputs);
            yield wrappedEditor.replaceSelectedTextsWith(commandOutputs);
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
exports.RunCommand = RunCommand;
//# sourceMappingURL=run.js.map