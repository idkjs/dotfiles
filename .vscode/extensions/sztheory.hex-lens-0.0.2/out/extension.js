"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const rebarProvider_1 = require("./providers/rebarProvider");
const mixProvider_1 = require("./providers/mixProvider");
function activate(context) {
    subscribeHoverProviderRebar(context);
    subscribeHoverProviderMix(context);
}
exports.activate = activate;
function deactivate() {
    return;
}
exports.deactivate = deactivate;
function subscribeHoverProviderRebar(context) {
    context.subscriptions.push(vscode.languages.registerHoverProvider(REBAR_FILE, new rebarProvider_1.RebarProvider()));
}
function subscribeHoverProviderMix(context) {
    context.subscriptions.push(vscode.languages.registerHoverProvider(MIX_FILE, new mixProvider_1.MixProvider()));
}
const REBAR_FILE = {
    language: "erlang",
    pattern: "**/rebar.config",
    scheme: "file"
};
const MIX_FILE = {
    language: "elixir",
    pattern: "**/mix.exs",
    scheme: "file"
};
//# sourceMappingURL=extension.js.map