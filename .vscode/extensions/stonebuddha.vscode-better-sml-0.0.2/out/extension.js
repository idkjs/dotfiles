"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const tree_sitter = require("web-tree-sitter");
const path = require("path");
const coloring = require("./coloring");
const scoping = require("./scoping");
const formatting = require("./formatting");
let initTreeSitter = tree_sitter.init();
let decorationCache = new Map();
function decoration(scope) {
    if (decorationCache.has(scope)) {
        return decorationCache.get(scope);
    }
    else {
        let rule = scoping.find(scope);
        if (rule) {
            let decoration = createDecoration(rule);
            decorationCache.set(scope, decoration);
            return decoration;
        }
        else {
            return undefined;
        }
    }
}
function createDecoration(rule) {
    let options = {};
    options.rangeBehavior = vscode.DecorationRangeBehavior.OpenOpen;
    if (rule.foreground) {
        options.color = rule.foreground;
    }
    if (rule.background) {
        options.backgroundColor = rule.background;
    }
    if (rule.fontStyle) {
        let parts = rule.fontStyle.split(' ');
        parts.forEach((part) => {
            switch (part) {
                case 'italic':
                    options.fontStyle = 'italic';
                    break;
                case 'bold':
                    options.fontWeight = 'bold';
                    break;
                case 'underline':
                    options.textDecoration = 'underline';
                    break;
                default:
                    break;
            }
        });
    }
    return vscode.window.createTextEditorDecorationType(options);
}
function loadStyles() {
    return __awaiter(this, void 0, void 0, function* () {
        yield scoping.load();
        for (let style of decorationCache.values()) {
            style.dispose();
        }
        decorationCache.clear();
    });
}
function activate(context) {
    let trees = {};
    let smlLang = { module: 'tree-sitter-sml', color: coloring.colorSML, parser: undefined };
    function open(editor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (editor.document.languageId !== 'sml') {
                return;
            }
            if (!smlLang.parser) {
                let wasm = path.relative(process.cwd(), path.join(context.extensionPath, "parsers", "sml.wasm"));
                let lang = yield tree_sitter.Language.load(wasm);
                let parser = new tree_sitter();
                parser.setLanguage(lang);
                smlLang.parser = parser;
            }
            let tree = smlLang.parser.parse(editor.document.getText());
            trees[editor.document.uri.toString()] = tree;
            colorUri(editor.document.uri);
        });
    }
    function edit(edit) {
        if (edit.document.languageId !== 'sml' || !smlLang.parser) {
            return;
        }
        if (edit.contentChanges.length !== 0) {
            let old_tree = trees[edit.document.uri.toString()];
            for (let change of edit.contentChanges) {
                let startIndex = change.rangeOffset;
                let oldEndIndex = change.rangeOffset + change.rangeLength;
                let newEndIndex = change.rangeOffset + change.text.length;
                let startPos = edit.document.positionAt(startIndex);
                let oldEndPos = edit.document.positionAt(oldEndIndex);
                let newEndPos = edit.document.positionAt(newEndIndex);
                let startPosition = asPoint(startPos);
                let oldEndPosition = asPoint(oldEndPos);
                let newEndPosition = asPoint(newEndPos);
                let delta = { startIndex, oldEndIndex, newEndIndex, startPosition, oldEndPosition, newEndPosition };
                old_tree.edit(delta);
            }
            let new_tree = smlLang.parser.parse(edit.document.getText(), old_tree);
            trees[edit.document.uri.toString()] = new_tree;
        }
        colorUri(edit.document.uri);
    }
    function close(doc) {
        delete trees[doc.uri.toString()];
    }
    function colorUri(uri) {
        for (let editor of vscode.window.visibleTextEditors) {
            if (editor.document.uri === uri) {
                colorEditor(editor);
            }
        }
    }
    function colorEditor(editor) {
        let tree = trees[editor.document.uri.toString()];
        if (!tree) {
            return;
        }
        let [scopes, errors] = smlLang.color(tree.rootNode, visibleLines(editor));
        let nodes = new Map();
        for (let [root, scope] of scopes) {
            if (!nodes.has(scope)) {
                nodes.set(scope, []);
            }
            nodes.get(scope).push(root);
        }
        for (let scope of nodes.keys()) {
            let dec = decoration(scope);
            if (dec) {
                let ranges = nodes.get(scope).map(range);
                editor.setDecorations(dec, ranges);
            }
        }
        for (let scope of decorationCache.keys()) {
            if (!nodes.has(scope)) {
                let dec = decorationCache.get(scope);
                editor.setDecorations(dec, []);
            }
        }
        diagonosticCollection.clear();
        let diags = [];
        for (let root of errors) {
            diags.push(new vscode.Diagnostic(range(root), 'Syntax error.'));
        }
        diagonosticCollection.set(editor.document.uri, diags);
    }
    function colorAllOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let editor of vscode.window.visibleTextEditors) {
                yield open(editor);
            }
        });
    }
    function onChangeConfiguration(event) {
        return __awaiter(this, void 0, void 0, function* () {
            let colorizationNeedsReload = event.affectsConfiguration('workbench.colorTheme');
            if (colorizationNeedsReload) {
                yield loadStyles();
                colorAllOpen();
            }
        });
    }
    function visibleLines(editor) {
        return editor.visibleRanges.map(range => {
            let start = range.start.line;
            let end = range.end.line;
            return { start, end };
        });
    }
    function range(root) {
        return new vscode.Range(root.startPosition.row, root.startPosition.column, root.endPosition.row, root.endPosition.column);
    }
    function asPoint(pos) {
        return { row: pos.line, column: pos.character };
    }
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(onChangeConfiguration));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(edit));
    context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(close));
    context.subscriptions.push(vscode.window.onDidChangeVisibleTextEditors(colorAllOpen));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorVisibleRanges(change => colorEditor(change.textEditor)));
    let diagonosticCollection = vscode.languages.createDiagnosticCollection('sml');
    context.subscriptions.push(diagonosticCollection);
    vscode.languages.registerDocumentFormattingEditProvider({ language: 'sml', scheme: 'file' }, {
        provideDocumentFormattingEdits(doc, opt, _tok) {
            let root = trees[doc.uri.toString()].rootNode;
            if (root.hasError()) {
                return [];
            }
            else {
                return formatting.format(root, opt);
            }
        }
    });
    vscode.languages.registerHoverProvider({ language: 'sml', scheme: 'file' }, {
        provideHover(doc, pos, _tok) {
            let ran = doc.getWordRangeAtPosition(pos, /'[A-Za-z0-9_']+|[A-Za-z][A-Za-z0-9_']*|[!%&$#+\-/:<=>?@\\~`^|*]+|~?[0-9]+\.[0-9]+([Ee]~?[0-9]+)?|~?[0-9]+|~?0x[0-9A-Fa-f]+|0w[0-9]+|0wx[0-9A-Fa-f]+/);
            if (ran) {
                return new vscode.Hover(doc.getText(ran));
            }
        }
    });
    function activateLazily() {
        return __awaiter(this, void 0, void 0, function* () {
            yield initTreeSitter;
            yield loadStyles();
            colorAllOpen();
        });
    }
    activateLazily();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map