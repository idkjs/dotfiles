"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Editor {
    constructor(vsEditor, locationFactory) {
        this.vsEditor = vsEditor;
        this.locationFactory = locationFactory;
    }
    get selectedTexts() {
        const editor = this.vsEditor;
        return editor.selections
            .map(selection => editor.document.getText(selection));
    }
    get entireText() {
        return this.vsEditor.document.getText();
    }
    get isTextSelected() {
        return this.selectedTexts.length > 1 || this.selectedTexts[0] !== '';
    }
    get filePath() {
        const uri = this.vsEditor.document.uri;
        return uri.scheme === 'file' ? uri.fsPath : undefined;
    }
    replaceSelectedTextsWith(texts) {
        const editor = this.vsEditor;
        return editor.edit(editBuilder => {
            editor.selections.forEach((selection, index) => {
                editBuilder.replace(selection, texts[index]);
            });
        });
    }
    replaceEntireTextWith(text) {
        const editor = this.vsEditor;
        const document = editor.document;
        const lineCount = document.lineCount;
        const lastLine = document.lineAt(lineCount - 1);
        const entireRange = this.locationFactory.createRange(this.locationFactory.createPosition(0, 0), lastLine.range.end);
        return editor.edit(editBuilder => {
            editBuilder.replace(entireRange, text);
        });
    }
}
exports.default = Editor;
//# sourceMappingURL=editor.js.map