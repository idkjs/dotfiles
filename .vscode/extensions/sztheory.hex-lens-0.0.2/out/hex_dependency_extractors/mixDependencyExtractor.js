"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hexDependencyExtractor_1 = require("./hexDependencyExtractor");
class MixDependencyExtractor extends hexDependencyExtractor_1.HexDependencyExtractor {
    depName() {
        const cleanLine = this.line.trim();
        const matches = this.lineNameDepRegexp().exec(cleanLine);
        if (matches === null || matches.length === 1) {
            return "";
        }
        return matches[1];
    }
    docTextDepsRegexp() {
        return /(\s*defp deps do\s*\[(?:(?:\s*(?:\#.+|\{:(?:\w+),?.*\},?\n))+)\s*\]\s*end)/gm;
    }
    lineNameDepRegexp() {
        return /\{:(\w+),?.*\}/;
    }
}
exports.MixDependencyExtractor = MixDependencyExtractor;
//# sourceMappingURL=mixDependencyExtractor.js.map