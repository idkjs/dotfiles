"use strict";
/**
 * Formatter module - structures & logic for formatting Procfiles within the editor.
 * @module extension
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
exports.ProcfileOnTypeFormat = exports.ProcfileDocumentRangeFormat = exports.ProcfileDocumentFormat = void 0;
const vsc = require("vscode");
const core = require("./core");
const re = require("./core/re");
class ProcfileDocumentFormat {
    provideDocumentFormattingEdits(document) {
        return __awaiter(this, void 0, void 0, function* () {
            return formatDocumentLines(document, 0, document.lineCount);
        });
    }
}
exports.ProcfileDocumentFormat = ProcfileDocumentFormat;
class ProcfileDocumentRangeFormat {
    provideDocumentRangeFormattingEdits(document, range) {
        return __awaiter(this, void 0, void 0, function* () {
            return formatDocumentLines(document, range.start.line, range.end.line + 1);
        });
    }
}
exports.ProcfileDocumentRangeFormat = ProcfileDocumentRangeFormat;
class ProcfileOnTypeFormat {
    provideOnTypeFormattingEdits(document, position, ch) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ch === re.sep.source &&
                document.getWordRangeAtPosition(position, re.INTRO) &&
                vsc.workspace.getConfiguration("procfile").get("insertSpace")) {
                return [vsc.TextEdit.insert(position, " ")];
            }
            return undefined;
        });
    }
}
exports.ProcfileOnTypeFormat = ProcfileOnTypeFormat;
/**
 * Get an array of edits to make to a document so all lines are in a standard format.
 * @param document - VS Code Document to format.
 * @param start - First line (0-indexed) to format.
 * @param stop - Last line (1-indexed) through which to format.
 * @access package
 */
function formatDocumentLines(document, start, stop) {
    return __awaiter(this, void 0, void 0, function* () {
        const edits = [];
        let i = start;
        while (i < stop) {
            const line = document.lineAt(i);
            if (!line.isEmptyOrWhitespace && !line.firstNonWhitespaceCharacterIndex) {
                edits.push(vsc.TextEdit.replace(line.range, core.ProcessDef.fmtString(line.text, vsc.workspace.getConfiguration("procfile").get("insertSpace"))));
            }
            i++;
        }
        return edits;
    });
}
//# sourceMappingURL=formatters.js.map