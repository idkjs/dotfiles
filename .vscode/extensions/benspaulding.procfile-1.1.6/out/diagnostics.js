"use strict";
/**
 * Diagnostics module - structures & logic for sending diagnostic info to the editor.
 * @module diagnostics
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
exports.procfileCloseHandler = exports.procfileOpenChangeHandler = exports.diagnosticCollection = void 0;
const vsc = require("vscode");
const core = require("./core");
const re = require("./core/re");
/**
 * Limit of number of diagnostic results to return.
 * VS Code only shows the first thousand, but there is no need for that. If your
 * Procfile has more than a thousand errors you have bigger problems.
 * @access package
 */
const LIMIT = 100;
exports.diagnosticCollection = vsc.languages.createDiagnosticCollection("procfile");
function procfileOpenChangeHandler(documentish) {
    return __awaiter(this, void 0, void 0, function* () {
        const document = documentish.document || documentish;
        if (document.languageId === "procfile") {
            exports.diagnosticCollection.delete(document.uri);
            exports.diagnosticCollection.set(document.uri, yield getDiagnostics(document));
        }
    });
}
exports.procfileOpenChangeHandler = procfileOpenChangeHandler;
function procfileCloseHandler(document) {
    return __awaiter(this, void 0, void 0, function* () {
        if (document.languageId === "procfile") {
            exports.diagnosticCollection.delete(document.uri);
        }
    });
}
exports.procfileCloseHandler = procfileCloseHandler;
/**
 * Builds an array of diagnostic information for the given document.
 *
 * The only diagnostics provided is a check for duplicate process names.
 * @access package
 */
function getDiagnostics(document) {
    return __awaiter(this, void 0, void 0, function* () {
        const procfile = core.Procfile.fromString(document.getText());
        const conflicts = procfile.conflicts.slice(undefined, LIMIT);
        return conflicts.map(([line, twins]) => {
            const diagnostic = new vsc.Diagnostic(getNameRange(document, line.num), "Process names must be unique within a file.");
            diagnostic.source = "procfile";
            diagnostic.relatedInformation = twins.slice(undefined, LIMIT).map(twin => {
                const range = getNameRange(document, twin.num);
                return new vsc.DiagnosticRelatedInformation(new vsc.Location(document.uri, range), `Duplicate process name "${document.getText(range)}"`);
            });
            return diagnostic;
        });
    });
}
/**
 * Get a Range for the process name at the given line number.
 * @throws If a range cannot be found.
 * @access package
 */
function getNameRange(document, lineNum) {
    const range = document.getWordRangeAtPosition(new vsc.Position(lineNum, 0), re.NAME);
    if (range === undefined) {
        throw Error(`Range not found for process name at ${document.uri.fsPath}:${lineNum}`);
    }
    return range;
}
//# sourceMappingURL=diagnostics.js.map