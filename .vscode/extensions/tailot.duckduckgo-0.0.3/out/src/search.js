"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const magic = require("./def");
const urlaction = require('openurl');
class DuckDuckGoController {
    constructor() {
    }
    static getSearchPhrase() {
        let editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return '';
        }
        let text = editor.document.getText();
        if (!text || editor.selection.isEmpty)
            return '';
        let selStart, selEnd;
        selStart = editor.document.offsetAt(editor.selection.start);
        selEnd = editor.document.offsetAt(editor.selection.end);
        let phrase = text.slice(selStart, selEnd).trim();
        phrase = phrase.replace(/\s\s+/g, ' ');
        phrase = phrase.slice(0, 100).trim();
        return phrase;
    }
    static webSearch() {
        urlaction.open(magic.Def.DUCKWEB + this.getSearchPhrase());
    }
    static imagesSearch() {
        urlaction.open(magic.Def.DUCKIMAGES + this.getSearchPhrase());
    }
    static videosSearch() {
        urlaction.open(magic.Def.DUCKVIDEOS + this.getSearchPhrase());
    }
    static bangSearch() {
        var phrase = this.getSearchPhrase();
        vscode_1.window.showQuickPick(magic.Def.DUCKLISTBANG).then(selected => {
            if (selected != undefined && selected.includes('!')) {
                urlaction.open(magic.Def.DUCKWEB + selected + " " + phrase);
            }
        });
    }
}
exports.DuckDuckGoController = DuckDuckGoController;
//# sourceMappingURL=search.js.map