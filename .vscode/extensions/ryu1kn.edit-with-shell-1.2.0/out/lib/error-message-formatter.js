"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const REPLACE_PAIRS = [
    ['\n', '\\n'],
    ['*', '\\*'],
    ['_', '\\_'],
    ['[', '\\['],
    [']', '\\]']
];
class ErrorMessageFormatter {
    format(message) {
        const trimmedMessage = (message || '').trim();
        return this.escapeText(trimmedMessage);
    }
    escapeText(string) {
        return REPLACE_PAIRS.reduce((s, pair) => replaceAll(s, pair[0], pair[1]), string);
    }
}
exports.default = ErrorMessageFormatter;
function replaceAll(string, fromStr, toStr) {
    return string.split(fromStr).join(toStr);
}
//# sourceMappingURL=error-message-formatter.js.map