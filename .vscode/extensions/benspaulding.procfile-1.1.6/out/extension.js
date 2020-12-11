"use strict";
/**
 * Extension module - main entry point for VS Code to run the Procfile extension.
 * @module extension
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vsc = require("vscode");
const re = require("./core/re");
const diagnostics_1 = require("./diagnostics");
const formatters_1 = require("./formatters");
const hovers_1 = require("./hovers");
const symbols_1 = require("./symbols");
/** Any Procfile (syntax highlighting and validation). */
const PROCFILE_LANG = { language: "procfile" };
function activate(context) {
    context.subscriptions.push(vsc.languages.registerDocumentSymbolProvider(PROCFILE_LANG, new symbols_1.ProcfileDocumentSymbol()), vsc.languages.registerHoverProvider(PROCFILE_LANG, new hovers_1.ProcfileHover()), vsc.languages.registerDocumentFormattingEditProvider(PROCFILE_LANG, new formatters_1.ProcfileDocumentFormat()), vsc.languages.registerDocumentRangeFormattingEditProvider(PROCFILE_LANG, new formatters_1.ProcfileDocumentRangeFormat()), vsc.languages.registerOnTypeFormattingEditProvider(PROCFILE_LANG, new formatters_1.ProcfileOnTypeFormat(), re.sep.source, re.comment.source), diagnostics_1.diagnosticCollection, vsc.workspace.onDidOpenTextDocument(diagnostics_1.procfileOpenChangeHandler), vsc.workspace.onDidChangeTextDocument(diagnostics_1.procfileOpenChangeHandler), vsc.workspace.onDidCloseTextDocument(diagnostics_1.procfileCloseHandler));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map