'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
const fs = require("fs");
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.openITerm2', (e) => {
        if (process.platform === "darwin") {
            const scriptPath = path.join(__dirname, "../../res/open-item2.scpt");
            console.log(e);
            fs.stat(e.fsPath, (err, stats) => {
                if (err)
                    return;
                let dirPath = e.fsPath;
                if (stats.isFile()) {
                    dirPath = path.dirname(dirPath);
                }
                console.log(dirPath);
                let childProcess = child_process_1.spawn("osascript", [scriptPath, "cd", `"${dirPath}"`]);
            });
        }
        else {
            vscode.commands.executeCommand("workbench.action.terminal.openNativeConsole", e);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map