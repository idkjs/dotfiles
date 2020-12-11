"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class StatusBar {
    constructor() {
        this.buildStatusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 5.04);
        this.buildConfigStatusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 5.03);
        this.debugStatusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 5.021);
        this.runStatusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 5.02);
        this.debugConfigStatusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 5.01);
        this.killStatusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 5.00);
        this.buildStatusItem.command = "xcodebuild-tools.build";
        this.buildStatusItem.tooltip = "Click to build the project";
        this.buildStatusItem.text = "$(gear) xcodebuild:";
        this.buildConfigStatusItem.command = "xcodebuild-tools.selectBuildConfiguration";
        this.buildConfigStatusItem.tooltip = "Click to select the build configuration";
        this.debugStatusItem.command = "xcodebuild-tools.debug";
        this.debugStatusItem.tooltip = "Click to launch the debugger for the selected debug configuration";
        this.debugStatusItem.text = "$(bug)";
        this.runStatusItem.command = "xcodebuild-tools.run";
        this.runStatusItem.tooltip = "Click to run (without debugging) the selected debug configuration";
        this.runStatusItem.text = "$(triangle-right)";
        this.debugConfigStatusItem.command = "xcodebuild-tools.selectDebugConfiguration";
        this.debugConfigStatusItem.tooltip = "Click to select the debug configuration";
        this.killStatusItem.command = "xcodebuild-tools.kill";
        this.killStatusItem.tooltip = "Click to kill current build";
        this.killStatusItem.text = "$(x)";
    }
    forallItems(f) {
        f(this.buildStatusItem);
        f(this.buildConfigStatusItem);
        f(this.debugStatusItem);
        f(this.runStatusItem);
        f(this.debugConfigStatusItem);
        f(this.killStatusItem);
    }
    dispose() {
        this.forallItems(i => i.dispose());
    }
    show() {
        this.forallItems(i => i.show());
    }
    hide() {
        this.forallItems(i => i.hide());
    }
    update(buildConfig, debugConfig) {
        this.buildConfigStatusItem.text = buildConfig;
        this.debugConfigStatusItem.text = debugConfig;
        this.show();
    }
}
exports.StatusBar = StatusBar;
//# sourceMappingURL=status.js.map