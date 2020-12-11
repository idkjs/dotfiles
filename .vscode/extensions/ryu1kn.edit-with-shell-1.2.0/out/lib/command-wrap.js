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
const command_1 = require("./errors/command");
const error_message_formatter_1 = require("./error-message-formatter");
class CommandWrap {
    constructor(command, wrapEditor, showErrorMessage, logger) {
        this.command = command;
        this.wrapEditor = wrapEditor;
        this.showErrorMessage = showErrorMessage;
        this.logger = logger;
        this.errorMessageFormatter = new error_message_formatter_1.default();
    }
    execute(editor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.command.execute(editor && this.wrapEditor(editor));
            }
            catch (e) {
                this.handleError(e);
            }
        });
    }
    handleError(e) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.error(e.stack);
            const sourceMessage = e instanceof command_1.default ? e.errorOutput : e.message;
            const errorMessage = this.errorMessageFormatter.format(sourceMessage);
            yield this.showErrorMessage(errorMessage);
        });
    }
}
exports.default = CommandWrap;
//# sourceMappingURL=command-wrap.js.map