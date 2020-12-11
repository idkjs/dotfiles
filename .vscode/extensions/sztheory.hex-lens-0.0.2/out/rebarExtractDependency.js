"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DOC_TEXT_DEPENDENCIES_REGEXP = /{deps\,\s*\[[\s\n]*(?:\{(\w+)\,[\"\'].+[\"\']\}\}[\s\n]*\]\})+\./gm;
const LINE_NAME_DEPENDENCY_REGEXP = /\{:(\w+),?.*\}/;
const LINE_VERSION_REGEXP = /[\"\'].+\s+([\d\.]*\d)[\"\'].+/;
function rebarDepNameFromLine(line) {
    const cleanLine = line.trim();
    const matches = LINE_NAME_DEPENDENCY_REGEXP.exec(cleanLine);
    if (matches === null || matches.length === 1) {
        return "";
    }
    return matches[1];
}
exports.rebarDepNameFromLine = rebarDepNameFromLine;
function rebarVersionFromLine(line) {
    const matches = LINE_VERSION_REGEXP.exec(line);
    if (matches === null || matches.length === 1) {
        return "";
    }
    return matches[1];
}
exports.rebarVersionFromLine = rebarVersionFromLine;
function extractRebarDependency(documentText, line) {
    if (!isRebarDependency(documentText, line)) {
        return undefined;
    }
    const name = rebarDepNameFromLine(line);
    const requirements = rebarVersionFromLine(line);
    return { name: name, requirements: requirements };
}
exports.extractRebarDependency = extractRebarDependency;
function rebarDependenciesText(docText) {
    const matches = DOC_TEXT_DEPENDENCIES_REGEXP.exec(docText);
    if (matches === null || matches.length === 1) {
        return "";
    }
    return matches[0];
}
function isRebarDependency(documentText, line) {
    const depsText = rebarDependenciesText(documentText);
    const cleanLine = line.trim();
    if (depsText.trim() === "") {
        return false;
    }
    return (depsText.includes(cleanLine) &&
        rebarDepNameFromLine(cleanLine).trim() !== "");
}
//# sourceMappingURL=rebarExtractDependency.js.map