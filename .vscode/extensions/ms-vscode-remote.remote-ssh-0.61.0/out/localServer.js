!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1153)}({11:function(e,t){e.exports=require("fs")},1153:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(49),s=n(83),i=n(11),o=n(16),u=n(7),c=n(45),a=JSON.parse(process.argv[2]);let l=!1;function d(e,t,n,r){t.writeHead(n,{"Content-Type":"text/plain"}),t.end(r)}function p(e){console.log(c.markLines(e,"local-server"))}function f(e){console.error(c.markLines(e,"local-server"))}class h{constructor(){this.child=h.spawnSsh()}dispose(){this.child.kill()}static spawnSsh(){const e=r.spawn(a.sshCommand,a.sshArgs,{stdio:["inherit","pipe","pipe"],windowsHide:!0});let t=!1;return e.stdout.on("data",e=>{t||process.stdout.write(e),e.toString().includes(": end")&&(t=!0)}),e.stderr.on("data",e=>{t||process.stderr.write(e)}),e.on("exit",()=>{l||(p("ssh child died, shutting down"),process.exit(0))}),p("Spawned ssh: "+e.pid),e}}const m=new class{constructor(e){this.ipcHandlePath=e,this.server=o.createServer((e,t)=>this.onRequest(e,t));try{this.server.listen(this.ipcHandlePath),this.server.on("error",e=>f(e.message))}catch(e){f("Could not launch management server."),process.exit(1)}this.delayShutdown()}delayShutdown(){this.shutdownTimer&&clearTimeout(this.shutdownTimer),this.shutdownTimer=setTimeout(()=>{this.dispose(),y(),p("Timed out"),process.exit(0)},5e3)}onRequest(e,t){if("GET"!==e.method)return t.writeHead(405,{"Content-Type":"text/plain"}),t.end("Unsupported method "+e.method);if(!e.url)return d(0,t,400,"Bad request.");const n=u.parse(e.url,!0).pathname;return n?("/delay-shutdown"===n&&(this.delayShutdown(),t.writeHead(200),t.end("OK")),t.writeHead(404,{"Content-Type":"text/plain"}),t.end("Not found")):d(0,t,400,"Bad request.")}dispose(){this.server.close()}}(a.ipcHandlePath),w=new h;function y(){if(l=!0,m.dispose(),w.dispose(),a.dataFilePath&&i.existsSync(a.dataFilePath))try{const e=i.readFileSync(a.dataFilePath);JSON.parse(e.toString()).pid===process.pid&&i.unlinkSync(a.dataFilePath)}catch(e){}}process.on("exit",()=>{y()}),process.on("SIGTERM",()=>{y(),process.exit(s.SIGTERM)})},16:function(e,t){e.exports=require("http")},34:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isWindows=void 0,t.isWindows="win32"===process.platform},45:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.stripAllNewlines=t.escapeRegExpCharacters=t.splitLines=t.markLine=t.markLines=t.stripTrailingNewline=t.quoteForShellIfNeeded=t.quoteForShell=t.stripEscapeSequences=t.lastNonemptyLine=void 0;const r=n(34);function s(e){return e.replace(/\x1b\[\??[0-9]{0,3}(;[0-9]{1,3})?[a-zA-Z]/g,"").replace(/\u0008/g,"").replace(/\r/g,"")}function i(e,t){return t?`"${e}"`:`'${e}'`}function o(e){return e.replace(/\r?\n$/,"")}function u(e){return e.split(/\r?\n/g)}t.lastNonemptyLine=function(e){const t=u(e);if(r.isWindows)for(let e=t.length-1;e>=0;e--){const n=s(t[e]);if(n)return n}const n=t.filter(e=>!!e);return n[n.length-1]},t.stripEscapeSequences=s,t.quoteForShell=i,t.quoteForShellIfNeeded=function(e,t){return e.match(/[^a-z0-9]/)?i(e,t):e},t.stripTrailingNewline=o,t.markLines=function(e,t=""){return u(o(e)).map(e=>`${t}> ${e}`).join("\n")},t.markLine=function(e,t=""){return`${t}> ${e}`},t.splitLines=u,t.escapeRegExpCharacters=function(e){return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g,"\\$&")},t.stripAllNewlines=function(e){return e.replace(/\r?\n/,"")}},49:function(e,t){e.exports=require("child_process")},7:function(e,t){e.exports=require("url")},83:function(e,t){e.exports=require("constants")}}));
//# sourceMappingURL=localServer.js.map