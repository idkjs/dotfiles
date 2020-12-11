'use strict';
import * as vscode from 'vscode';
import * as search from './search';
import * as magic from './def';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('duckduckgo.webSearch', () => search.DuckDuckGoController.webSearch());
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('duckduckgo.imagesSearch', () => search.DuckDuckGoController.imagesSearch());
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('duckduckgo.videosSearch', () => search.DuckDuckGoController.videosSearch());
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('duckduckgo.bangSearch', () => search.DuckDuckGoController.bangSearch());
    context.subscriptions.push(disposable);
}

export function deactivate() {
}