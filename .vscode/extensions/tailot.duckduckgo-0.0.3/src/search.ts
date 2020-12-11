import {
    window
} from 'vscode';
import * as magic from './def';

const urlaction = require('openurl');

export class DuckDuckGoController {
    constructor() {
    }

    private static getSearchPhrase(): string {
        let editor = window.activeTextEditor;
        if (!editor) {
            return '';
        }
        let text = editor.document.getText();
        if (!text || editor.selection.isEmpty) return '';
        let selStart, selEnd;

        selStart = editor.document.offsetAt(editor.selection.start);
        selEnd = editor.document.offsetAt(editor.selection.end);
        
        let phrase = text.slice(selStart, selEnd).trim();
        phrase = phrase.replace(/\s\s+/g, ' ');

        phrase = phrase.slice(0, 100).trim();
        return phrase;
    }

    public static webSearch(): void {
        urlaction.open(magic.Def.DUCKWEB + this.getSearchPhrase());
    }

    public static imagesSearch(): void {
        urlaction.open(magic.Def.DUCKIMAGES + this.getSearchPhrase());
    }

    public static videosSearch(): void {
        urlaction.open(magic.Def.DUCKVIDEOS + this.getSearchPhrase());
    }

    public static bangSearch(): void {
        var phrase = this.getSearchPhrase();
        window.showQuickPick(magic.Def.DUCKLISTBANG).then(selected => {
            if (selected != undefined && selected.includes('!')) {
                urlaction.open(magic.Def.DUCKWEB + selected + " " + phrase);
            }
        });
    }
}