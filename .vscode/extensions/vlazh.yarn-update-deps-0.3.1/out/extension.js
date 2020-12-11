"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// eslint-disable-next-line import/no-unresolved
const vscode = __importStar(require("vscode"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function showError(message) {
    vscode.window.showErrorMessage(`Yarn update-deps: ${message}`);
}
function runCommand(workspace) {
    const task = new vscode.Task({ type: 'yarn' }, workspace, 'update-deps', 'yarn', new vscode.ShellExecution(
    // https://misc.flogisoft.com/bash/tip_colors_and_formatting
    // eslint-disable-next-line no-template-curly-in-string
    "echo -e '\\e[1;97;100m Run update-deps for \\e[102m ${workspaceFolderBasename} \\e[0m\n' && yarn upgrade-interactive --latest"));
    task.isBackground = false;
    task.presentationOptions.echo = false;
    task.presentationOptions.focus = true;
    task.runOptions.reevaluateOnRerun = true;
    vscode.tasks.executeTask(task).then(undefined, (err) => {
        console.error(err);
        showError(err.toString());
    });
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('extension.update-deps', () => __awaiter(this, void 0, void 0, function* () {
        // The code you place here will be executed every time your command is executed
        var _a;
        const workspaceFolders = (_a = vscode.workspace.workspaceFolders) !== null && _a !== void 0 ? _a : [];
        // Must have at least one workspace folder
        if (workspaceFolders.length === 0) {
            showError('You must have a workspace opened.');
            return;
        }
        const filteredFolders = yield new Promise((resolve) => resolve(workspaceFolders.filter((folder) => fs_1.default.existsSync(path_1.default.join(folder.uri.fsPath, 'package.json')))));
        // Must have at least one workspace folder with package.json
        if (workspaceFolders.length === 0) {
            showError('You must have a workspace opened with existing package.json.');
            return;
        }
        // If in a multifolder workspace, prompt user to select which one to choose.
        if (filteredFolders.length > 1) {
            const folders = new Promise((resolve) => resolve(filteredFolders.map((folder) => ({ label: folder.name, folder }))));
            vscode.window.showQuickPick(folders, { placeHolder: 'Select workspace folder' }).then((selected) => selected && runCommand(selected.folder), (err) => showError(err.toString()));
        }
        else {
            // Otherwise, use the first one
            const folder = filteredFolders[0];
            runCommand(folder);
        }
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map