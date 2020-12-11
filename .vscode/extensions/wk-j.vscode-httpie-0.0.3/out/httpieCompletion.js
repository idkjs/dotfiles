"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keywords = [
    "GET",
    "POST",
    "DELETE",
    "PUT",
    "http",
];
const options = [
    "--json",
    "--form",
    "--pretty",
    "--style",
    "--print",
    "--headers",
    "--body",
    "--verbose",
    "--all",
    "--history-print",
    "--stream",
    "--output",
    "--download",
    "--session",
    "--session-read-only",
    "--auth",
    "--auth-type",
    "--proxy",
    "--follow",
    "--max-redirects",
    "--timeout",
    "--check-status",
    "--ssl",
    "--cert-key",
    "--ignore-stdin",
    "--help",
    "--version",
    "--traceback",
    "--default-scheme",
    "--debug"
];
class HttpieCompletion {
    provideCompletionItems(document, position, token, context) {
        return options.map(x => ({
            label: x,
            insertText: x
        })).concat(keywords.map(x => ({
            label: x,
            insertText: x
        })));
    }
    resolveCompletionItem(item, token) {
        return Object.assign({}, item, { insertText: (item.insertText.toString().replace("--", "")) });
    }
}
exports.HttpieCompletion = HttpieCompletion;
//# sourceMappingURL=httpieCompletion.js.map