// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "reactnative-start" is now active!');
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('reactnative-start', function () {
    // The code you place here will be executed every time your command is executed
    // vscode.env.openExternal(vscode.Uri.parse('https://www.baidu.com/'));
    function getWebViewContent(context, templatePath) {
      //此函数可以引入html文件引入并按规则修改资源地址
      const resourcePath = path.join(context.extensionPath, templatePath);
      const dirPath = path.dirname(resourcePath);
      let html = fs.readFileSync(resourcePath, 'utf-8');
      // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
      html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        return (
          $1 +
          vscode.Uri.file(path.resolve(dirPath, $2))
            .with({ scheme: 'vscode-resource' })
            .toString() +
          '"'
        );
      });
      return html;
    }
    const panel = vscode.window.createWebviewPanel(
      //创建webview
      'React Native', // Identifies the type of the webview. Used internally
      'React Native', // Title of the panel displayed to the user
      vscode.ViewColumn.One, // Editor column to show the new webview panel in.
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      },
    );
    panel.webview.html = getWebViewContent(context, 'dist/index.html');
    // panel.webview.html = `<!DOCTYPE html>
    // <html lang="en">
    //     <head>
    //     <meta charset="utf-8" />
    //     <meta name="viewport" content="width=device-width, initial-scale=1" />
    //     <style>
    //         html,
    //         body {
    //             margin: 0 !important;
    //             padding: 0 !important;
    //             width: 100%;
    //             height: 100%;
    //         }
    //         .iframeDiv {
    //             width: 100%;
    //             height: 100%;
    //         }
    //     </style>
    //     </head>

    //     <body>

    //     <iframe id='iframe1' class="iframeDiv" src=http://www.saimo.cn" scrolling="auto"></iframe>
    //     </body>
    // </html>`
  });
  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() { }

module.exports = {
  activate,
  deactivate,
};
