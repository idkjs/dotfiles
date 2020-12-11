"use strict";
/**
 * Hovers module - structures & logic necessary for showing information to the user
 * when they hover over relevant parts of a Procfile.
 * @module hovers
 */
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
exports.ProcfileHover = void 0;
const vsc = require("vscode");
const re = require("./core/re");
const special = require("./core/special");
/**
 * Format a message about particular process names for the user.
 *
 * Note that currently the vsc.MarkdownString this result is consumed by should have
 * `supportThemeIcons=true`.
 * @param msg - Object to be formatted into a Markdown text string.
 * @access package
 */
function formatMsg(msg) {
    return `$(info) **${msg.provider}**: ${msg.text} ([docs](${msg.docUrl}))`;
}
class ProcfileHover {
    provideHover(document, position) {
        return __awaiter(this, void 0, void 0, function* () {
            // Is user hovering over a process name?
            const wordRange = document.getWordRangeAtPosition(position, re.NAME);
            if (!wordRange) {
                return undefined;
            }
            // Is user hovering over a *special* process name?
            const specialName = special.PROCESS_NAMES.find(processName => processName.name === document.getText(wordRange));
            if (!specialName) {
                return undefined;
            }
            // Show a message for the special name being hovered.
            const msgs = specialName.msgs.map(msg => formatMsg(msg)).join("\n\n");
            const markdownMsgs = new vsc.MarkdownString(msgs, true);
            return new vsc.Hover(markdownMsgs);
        });
    }
}
exports.ProcfileHover = ProcfileHover;
//# sourceMappingURL=hovers.js.map