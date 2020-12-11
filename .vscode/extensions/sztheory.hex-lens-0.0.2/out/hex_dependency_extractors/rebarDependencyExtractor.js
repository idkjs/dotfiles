"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hexDependencyExtractor_1 = require("./hexDependencyExtractor");
class RebarDependencyExtractor extends hexDependencyExtractor_1.HexDependencyExtractor {
    docTextDepsRegexp() {
        return /(deps\,[^\[\]]+\[[^\[\]]+\])/gm;
    }
    lineNameDepRegexp() {
        return /\{\s*\w+\,/;
    }
    depName() {
        return this.hoverWord;
    }
}
exports.RebarDependencyExtractor = RebarDependencyExtractor;
//# sourceMappingURL=rebarDependencyExtractor.js.map