import * as vscode from 'vscode';

import { generateDebuggerOption } from './debugger-option/generate-debugger-option';

export function activate(context: vscode.ExtensionContext) {
  const commandOpenInBrowser = 'bit.openInBrowser';
  const commandGenerateDebuggerOption = 'bit.generateDebuggerOption';

  context.subscriptions.push(
    vscode.commands.registerCommand(commandOpenInBrowser, openInBrowser)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      commandGenerateDebuggerOption,
      generateDebuggerOption
    )
  );
}

export function deactivate() {
  console.log('on deactivate');
}

function openInBrowser() {
  vscode.env.openExternal(vscode.Uri.parse('https://www.bit.dev/'));
}
