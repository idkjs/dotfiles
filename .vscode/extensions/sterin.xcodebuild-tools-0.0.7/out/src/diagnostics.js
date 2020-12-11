"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const util = require("./util");
const Severity = {
    info: vscode.DiagnosticSeverity.Information,
    warning: vscode.DiagnosticSeverity.Warning,
    error: vscode.DiagnosticSeverity.Error
};
const MessageRegExp = RegExp('^(.*):(\\d+):(\\d+):\\s+(info|warning|error):\\s+(.*)$');
function parseOutput(diags, s) {
    util.splitLines(s);
    let messages = new Map();
    s.on('line', (line) => {
        let m = MessageRegExp.exec(line);
        if (m) {
            const file = m[1];
            const line = parseInt(m[2]) - 1;
            const col = parseInt(m[3]) - 1;
            const severity = Severity[m[4]];
            const message = m[5];
            let d = new vscode.Diagnostic(new vscode.Range(line, col, line, 1000), message, severity);
            if (!messages.has(file)) {
                messages.set(file, [d]);
                return;
            }
            messages.get(file).push(d);
        }
    });
    s.on('end', () => {
        diags.clear();
        for (let [fn, ds] of messages) {
            diags.set(vscode.Uri.file(fn), ds);
        }
    });
}
exports.parseOutput = parseOutput;
//# sourceMappingURL=diagnostics.js.map