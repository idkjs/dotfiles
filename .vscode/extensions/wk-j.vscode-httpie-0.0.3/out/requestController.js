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
const vscode_1 = require("vscode");
const executor_1 = require("./executor");
const selector_1 = require("./selector");
class RequestController {
    run(range) {
        return __awaiter(this, void 0, void 0, function* () {
            let editor = vscode_1.window.activeTextEditor;
            if (!editor || !editor.document) {
                return;
            }
            let selectedText = new selector_1.Selector().getSelectedText(editor, range);
            if (!selectedText) {
                return;
            }
            let joined = selectedText.replace(/\n/g, " ").replace(/\r\n/g, " ");
            executor_1.Executor.runInTerminal(joined);
        });
    }
}
exports.RequestController = RequestController;
//# sourceMappingURL=requestController.js.map