"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DOC_TEXT_DEPENDENCIES_REGEXP = /\s*defp deps do\s*\[(?:(?:\s*(?:\#.+|\{:(\w+),?.*\},?\n))+)\s*\]\s*end/gm;
const LINE_NAME_DEPENDENCY_REGEXP = /\{:(\w+),?.*\}/;
const LINE_VERSION_REGEXP = /[\"\'].+\s+([\d\.]*\d)[\"\'].+/;
function depNameFromLine(line) {
    const cleanLine = line.trim();
    const matches = LINE_NAME_DEPENDENCY_REGEXP.exec(cleanLine);
    if (matches === null || matches.length === 1) {
        return "";
    }
    return matches[1];
}
exports.depNameFromLine = depNameFromLine;
function versionFromLine(line) {
    const matches = LINE_VERSION_REGEXP.exec(line);
    if (matches === null || matches.length === 1) {
        return "";
    }
    return matches[1];
}
exports.versionFromLine = versionFromLine;
function dependenciesText(docText) {
    const matches = DOC_TEXT_DEPENDENCIES_REGEXP.exec(docText);
    if (matches === null || matches.length === 1) {
        return "";
    }
    return matches[0];
}
function isDependency(documentText, line) {
    const depsText = dependenciesText(documentText);
    const cleanLine = line.trim();
    if (depsText.trim() === "") {
        return false;
    }
    return (depsText.includes(cleanLine) && depNameFromLine(cleanLine).trim() !== "");
}
function extractDependency(documentText, line) {
    if (!isDependency(documentText, line)) {
        return undefined;
    }
    const name = depNameFromLine(line);
    const requirements = versionFromLine(line);
    return { name: name, requirements: requirements };
}
exports.extractDependency = extractDependency;
//# sourceMappingURL=extractDependency.js.map