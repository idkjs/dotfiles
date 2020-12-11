"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HexDependencyExtractor {
    constructor(documentText, line, hoverWord) {
        this.documentText = documentText;
        this.line = line;
        this.hoverWord = hoverWord;
    }
    extractHexDependency() {
        if (!this.isDependency()) {
            return null;
        }
        const name = this.depName();
        return { name: name };
    }
    depsText() {
        const matches = this.docTextDepsRegexp().exec(this.documentText.trim());
        if (matches === null || matches.length === 1) {
            return "";
        }
        return matches[1];
    }
    isDependency() {
        const depsText = this.depsText();
        const cleanLine = this.line.trim();
        if (depsText.trim() === "") {
            return false;
        }
        return depsText.includes(cleanLine) && this.depName().trim() !== "";
    }
}
exports.HexDependencyExtractor = HexDependencyExtractor;
//# sourceMappingURL=hexDependencyExtractor.js.map