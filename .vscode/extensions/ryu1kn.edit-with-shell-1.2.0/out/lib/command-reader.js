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
class CommandReader {
    constructor(historyStore, vsWindow) {
        this.historyStore = historyStore;
        this.vsWindow = vsWindow;
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            const history = this.historyStore.getAll();
            if (history.length === 0) {
                return this.vsWindow.showInputBox({
                    placeHolder: 'Enter a command',
                    prompt: 'No history available yet'
                });
            }
            const pickedCommand = yield this.letUserToPickCommand(history);
            return this.letUserToModifyCommand(pickedCommand);
        });
    }
    letUserToPickCommand(history) {
        const options = { placeHolder: 'Select a command to reuse or Cancel (Esc) to write a new command' };
        return this.vsWindow.showQuickPick(history.reverse(), options);
    }
    letUserToModifyCommand(pickedCommand) {
        const options = this.getInputBoxOption(pickedCommand);
        return this.vsWindow.showInputBox(options);
    }
    getInputBoxOption(pickedCommand) {
        if (!pickedCommand) {
            return { placeHolder: 'Enter a command' };
        }
        return {
            placeHolder: 'Enter a command',
            prompt: 'Edit the command if necessary',
            value: pickedCommand
        };
    }
}
exports.default = CommandReader;
//# sourceMappingURL=command-reader.js.map