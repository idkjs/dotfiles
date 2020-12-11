"use strict";
/**
 * Symbols module - structures & logic for giving symbol information to the editor.
 * @module symbols
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
exports.ProcfileDocumentSymbol = void 0;
const vsc = require("vscode");
const core = require("./core");
class ProcfileDocumentSymbol {
    provideDocumentSymbols(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const procfileDoc = core.Procfile.fromString(document.getText());
            return procfileDoc.processDefLines.map(line => {
                const pDef = line.val;
                const fullRange = document.lineAt(line.num).range;
                const nameRange = fullRange.with({
                    end: new vsc.Position(line.num, pDef.name.length - 1),
                });
                return new vsc.DocumentSymbol(pDef.name, pDef.cmd || "", vsc.SymbolKind.Function, fullRange, nameRange);
            });
        });
    }
}
exports.ProcfileDocumentSymbol = ProcfileDocumentSymbol;
//# sourceMappingURL=symbols.js.map