!function(t,e){for(var n in e)t[n]=e[n]}(exports,function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){t.exports=require("vscode")},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(0),i=n(2);e.activate=function(t){let e=o.commands.registerCommand("vscode-remote-extensionpack.welcome",()=>{i.WelcomePanel.createOrShow(t.extensionPath)});t.subscriptions.push(e)},e.deactivate=function(){}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(3),i=n(0);class r{constructor(t,e){this._disposables=[],this._extensionPath=t,this._panel=i.window.createWebviewPanel(r.viewType,"VS Code Remote: Quick Starts",e||i.ViewColumn.One,{enableScripts:!0,enableCommandUris:!0,localResourceRoots:[i.Uri.file(o.join(this._extensionPath,"out"))]}),this._panel.webview.html=this.getHtmlForWebview(),this._panel.onDidDispose(()=>this.dispose(),null,this._disposables)}static createOrShow(t){const e=i.window.activeTextEditor?i.window.activeTextEditor.viewColumn:void 0;r.currentPanel?r.currentPanel._panel.reveal(e,!0):r.currentPanel=new r(t,e)}getHtmlForWebview(){const t=i.Uri.file(o.join(this._extensionPath,"out","index.js")).with({scheme:"vscode-resource"}),e=function(){let t="";const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let n=0;n<32;n++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}();return`<!DOCTYPE html>\n\t\t\t<html lang="en">\n\t\t\t<head>\n\t\t\t\t<meta charset="UTF-8">\n\t\t\t\t<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${e}'; style-src vscode-resource: 'unsafe-inline' http: https: data:;">\n\t\t\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t\t\t\t<base href="${t}">\n\t\t\t</head>\n\t\t\t<body class="${process.platform} welcomePageContainer">\n\t\t\t\t<div id="main" class="welcomePage">\n\t\t\t\t\t<h1>Visual Studio Code Remote Development</h1>\n\t\t\t\t\t<div id="common"></div>\n\t\t\t\t\t<p class="subtitle detail">Quick Starts</p>\n\t\t\t\t\t<div id="ssh"></div>\n\t\t\t\t\t<div id="containers"></div>\n\t\t\t\t\t<div id="wsl"></div>\n\t\t\t\t\t<h2>Questions, Comments, Feedback</h2>\n\t\t\t\t\t<div id="feedback"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<script nonce="${e}" src="${t}"><\/script>\n\t\t\t</body>\n\t\t\t</html>`}dispose(){for(r.currentPanel=void 0,this._panel.dispose();this._disposables.length;){const t=this._disposables.pop();t&&t.dispose()}}}r.viewType="vscode-remote",e.WelcomePanel=r},function(t,e){t.exports=require("path")}]));