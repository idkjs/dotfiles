"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DOC_TEXT_DEPENDENCIES_REGEXP = /\s*defp deps do\s*\[(?:(?:\s*(?:\#.+|\{:(\w+),?.*\},?\n))+)\s*\]\s*end/gm;
const LINE_NAME_DEPENDENCY_REGEXP = /\{:(\w+),?.*\}/;
const LINE_VERSION_REGEXP = /[\"\'].+\s+([\d\.]*\d)[\"\'].+/;
function mixDepNameFromLine(line) {
    const cleanLine = line.trim();
    const matches = LINE_NAME_DEPENDENCY_REGEXP.exec(cleanLine);
    if (matches === null || matches.length === 1) {
        return "";
    }
    return matches[1];
}
exports.mixDepNameFromLine = mixDepNameFromLine;
function mixVersionFromLine(line) {
    const matches = LINE_VERSION_REGEXP.exec(line);
    if (matches === null || matches.length === 1) {
        return "";
    }
    return matches[1];
}
exports.mixVersionFromLine = mixVersionFromLine;
function extractMixDependency(documentText, line) {
    if (!isMixDependency(documentText, line)) {
        return undefined;
    }
    const name = mixDepNameFromLine(line);
    const requirements = mixVersionFromLine(line);
    return { name: name, requirements: requirements };
}
exports.extractMixDependency = extractMixDependency;
function mixDependenciesText(docText) {
    const matches = DOC_TEXT_DEPENDENCIES_REGEXP.exec(docText);
    if (matches === null || matches.length === 1) {
        return "";
    }
    return matches[0];
}
function isMixDependency(documentText, line) {
    const depsText = mixDependenciesText(documentText);
    const cleanLine = line.trim();
    if (depsText.trim() === "") {
        return false;
    }
    return (depsText.includes(cleanLine) && mixDepNameFromLine(cleanLine).trim() !== "");
}
//# sourceMappingURL=mixExtractDependency.js.map