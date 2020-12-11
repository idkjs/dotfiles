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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const hexPackage_1 = require("../hexPackage");
const rebarDependencyExtractor_1 = require("../hex_dependency_extractors/rebarDependencyExtractor");
const mixDependencyExtractor_1 = require("../hex_dependency_extractors/mixDependencyExtractor");
const LANGUAGE_ID_ERLANG = "erlang";
const LANGUAGE_ID_ELIXIR = "elixir";
class AbstractProvider {
    provideHover(document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const range = document.getWordRangeAtPosition(position);
            const documentText = document.getText();
            const line = document.lineAt(position.line).text.trim();
            // const hoverWord = document.getWordRangeAtPosition(position);
            const hoverWord = document.getText(range);
            let extractor = null;
            if (document.languageId === LANGUAGE_ID_ERLANG) {
                extractor = new rebarDependencyExtractor_1.RebarDependencyExtractor(documentText, line, hoverWord);
            }
            else if (document.languageId === LANGUAGE_ID_ELIXIR) {
                extractor = new mixDependencyExtractor_1.MixDependencyExtractor(documentText, line, hoverWord);
            }
            const hexDependency = extractor ? extractor.extractHexDependency() : null;
            if (!hexDependency) {
                return;
            }
            const hexPackage = new hexPackage_1.HexPackage(hexDependency.name);
            const details = yield this.getDetails(hexPackage);
            if (details === null) {
                // somehow the Hex API call failed
                // TODO: show error message in popup? and/or retry
                return;
            }
            const message = this.buildMessage(details);
            const link = new vscode.Hover(message, range);
            return link;
        });
    }
    buildMessage(info) {
        const str = `${info.name} (latest: ${info.latestVersion})\n\n${info.description}\n\n${info.htmlUrl}`;
        return str;
    }
    getDetails(hexPackage) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hexPackage.details();
        });
    }
}
exports.AbstractProvider = AbstractProvider;
//# sourceMappingURL=abstractProvider.js.map